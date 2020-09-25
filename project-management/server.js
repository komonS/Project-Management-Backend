const express = require('express')
var cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projectmanagement'
})
db.connect()
const app = express()

const dateFormat = require('dateformat');

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/users', (req, res) => {
    let sql = "SELECT memberID,username,fname,lname,picture FROM member WHERE memberID = '" + req.query.memberID + "'"
    let query = db.query(sql, (err, results) => {
        if (err) throw err

        res.json(results)
    })
})


app.get('/login', (req, res) => {

    let sql = "SELECT memberID FROM member WHERE username = '" + req.query.username + "' AND password = '" + req.query.password + "'"
    let query = db.query(sql, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

app.post('/task', (req, res) => {
    let subID;
    let sql = "INSERT INTO subproject(subProjectName,subProjectDescript,projectID)" +
        " VALUES('" + req.body.name + "','" + req.body.descript + "','1')";
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({
                status: 'error',
                detail: err
            })
        }
        subID = results.insertId
        if (subID != '') {
            sql = "INSERT INTO subproject_detail" +
                "(subProjectID,memberID,project_status_ID,subProjectStart,subProjectEnd,subProjectSuccess,subProjectComment,subProjectPriorityID) " +
                "VALUES('" + subID + "','" + req.body.memberID + "','" + req.body.status + "','" + req.body.start + "','" + req.body.end + "','" + req.body.success + "','" + req.body.comment + "','" + req.body.priority + "')";
            query = db.query(sql, (err, results) => {
                if (err) {
                    res.json({
                        status: 'error',
                        detail: err
                    })
                }
                if (results.insertId != '') {
                    res.json({
                        status: 'success',
                        taskID: results.insertId
                    })
                }
            })
        }
    })

})

app.put('/task/:subID/:subDetailID', (req, res) => {

    if (req.params.subID != null) {
        sql = "UPDATE subproject_detail " +
            "SET subProjectDetailName = '" + req.body.order + "' ," +
            "project_status_ID = '" + req.body.status + "' ," +
            "subProjectStart = '" + req.body.start + "' ," +
            "subProjectEnd = '" + req.body.end + "' ," +
            "subProjectSuccess = '" + req.body.success + "' ," +
            "subProjectComment = '" + req.body.comment + "' ," +
            "subProjectPriorityID = '" + req.body.priority + "'" +
            "WHERE subProjectDetail_ID  = '" + req.params.subID + "'"

        query = db.query(sql, (err, results) => {
            if (err) {
                res.json({
                    status: 'error',
                    detail: err
                })
            } else {
                sql = "UPDATE subproject " +
                    "SET subProjectName = '" + req.body.subject + "' ," +
                    "subProjectDescript = '" + req.body.descript + "' " +
                    "WHERE subProjectID = '" + req.params.subDetailID + "'"
                query = db.query(sql, (err, results) => {
                    if (err) {
                        res.json({
                            status: 'error',
                            detail: err
                        })
                    } else {
                        res.json({
                            status: 'success',
                            detail: 'Update task is complated'
                        })
                    }
                })
            }

        })
    } else {
        res.json({
            status: 'error',
            detail: 'plase enter subject ID and subject detail ID '
        })
    }

})

app.get('/task/view', (req, res) => {
    if (req.query.id != null) {
        let sql = "SELECT *,subproject_detail.project_status_ID AS sub_status_ID  FROM project " +
            " INNER JOIN project_detail ON project.projectID = project_detail.projectID" +
            " INNER JOIN subproject ON project.projectID = subproject.projectID" +
            " INNER JOIN subproject_detail ON subproject.subProjectID = subproject_detail.subProjectID" +
            " INNER JOIN priority ON priority.priorityID  = subproject_detail.subProjectPriorityID " +
            " INNER JOIN project_status ON project_status.project_status_ID   = subproject_detail.project_status_ID " +
            " LEFT JOIN member ON project_detail.memberID = member.memberID " +
            " WHERE subproject_detail.subProjectDetail_ID = '" + req.query.id + "'"

        //console.log(sql)

        let query = db.query(sql, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    } else {
        res.json({
            data: 'please enter task id'
        })
    }

})

app.get('/task', (req, res) => {
    let now = new Date();
    let date_now = dateFormat(now, "yyyy-mm-dd");
    //console.log(date_now)

    if (req.query.status == 'incoming') {
        let sql = "SELECT *,subproject_detail.project_status_ID AS sub_status_ID FROM project " +
            " INNER JOIN project_detail ON project.projectID = project_detail.projectID" +
            " INNER JOIN subproject ON project.projectID = subproject.projectID" +
            " INNER JOIN subproject_detail ON subproject.subProjectID = subproject_detail.subProjectID" +
            " INNER JOIN priority ON priority.priorityID  = subproject_detail.subProjectPriorityID " +
            " INNER JOIN project_status ON project_status.project_status_ID   = subproject_detail.project_status_ID " +
            " LEFT JOIN member ON project_detail.memberID = member.memberID " +
            " WHERE subproject_detail.memberID = '" + req.query.memberID + "'" +
            " AND subproject_detail.subProjectStart > '" + date_now + "'" +
            " AND (subproject_detail.project_status_ID != '5' OR subproject_detail.project_status_ID != '6')"

        //console.log(sql)

        let query = db.query(sql, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    } else if (req.query.status == 'going') {
        let sql = "SELECT *,subproject_detail.project_status_ID AS sub_status_ID FROM project " +
            " INNER JOIN project_detail ON project.projectID = project_detail.projectID" +
            " INNER JOIN subproject ON project.projectID = subproject.projectID" +
            " INNER JOIN subproject_detail ON subproject.subProjectID = subproject_detail.subProjectID" +
            " INNER JOIN priority ON priority.priorityID  = subproject_detail.subProjectPriorityID " +
            " INNER JOIN project_status ON project_status.project_status_ID   = subproject_detail.project_status_ID " +
            " LEFT JOIN member ON project_detail.memberID = member.memberID " +
            " WHERE subproject_detail.memberID = '" + req.query.memberID + "'" +
            " AND ((DATEDIFF(subproject_detail.subProjectStart,subproject_detail.subProjectEnd)) * 60)/100 >= DATEDIFF('" + date_now + "',subproject_detail.subProjectEnd)" +
            "AND subproject_detail.project_status_ID != '5' AND subproject_detail.project_status_ID != '6' " +
            "AND ((DATEDIFF('" + date_now + "',subproject_detail.subProjectEnd)) * 60)/100 >= 0"
        //console.log(sql)

        let query = db.query(sql, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    } else if (req.query.status == 'delayed') {
        let sql = "SELECT *,subproject_detail.project_status_ID AS sub_status_ID FROM project " +
            " INNER JOIN project_detail ON project.projectID = project_detail.projectID " +
            " INNER JOIN subproject ON project.projectID = subproject.projectID " +
            " INNER JOIN subproject_detail ON subproject.subProjectID = subproject_detail.subProjectID " +
            " INNER JOIN priority ON priority.priorityID  = subproject_detail.subProjectPriorityID " +
            " INNER JOIN project_status ON project_status.project_status_ID   = subproject_detail.project_status_ID " +
            " LEFT JOIN member ON project_detail.memberID = member.memberID " +
            " WHERE subproject_detail.memberID = '" + req.query.memberID + "' " +
            " AND subproject_detail.subProjectEnd < '" + date_now + "' AND (subproject_detail.project_status_ID != '5' OR subproject_detail.project_status_ID != '6')"

        //console.log(sql)

        let query = db.query(sql, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    } else if (req.query.status == 'all') {
        let sql = "SELECT *,subproject_detail.project_status_ID AS sub_status_ID FROM project " +
            " INNER JOIN project_detail ON project.projectID = project_detail.projectID" +
            " INNER JOIN subproject ON project.projectID = subproject.projectID" +
            " INNER JOIN subproject_detail ON subproject.subProjectID = subproject_detail.subProjectID" +
            " INNER JOIN priority ON priority.priorityID  = subproject_detail.subProjectPriorityID " +
            " INNER JOIN project_status ON project_status.project_status_ID   = subproject_detail.project_status_ID " +
            " LEFT JOIN member ON project_detail.memberID = member.memberID " +
            " WHERE subproject_detail.memberID = '" + req.query.memberID + "'"

        //console.log(sql)
        let query = db.query(sql, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    } else if (req.query.status == 'progress') {
        let sql = "SELECT *,subproject_detail.project_status_ID AS sub_status_ID FROM project " +
            " INNER JOIN project_detail ON project.projectID = project_detail.projectID" +
            " INNER JOIN subproject ON project.projectID = subproject.projectID" +
            " INNER JOIN subproject_detail ON subproject.subProjectID = subproject_detail.subProjectID" +
            " INNER JOIN priority ON priority.priorityID  = subproject_detail.subProjectPriorityID " +
            " INNER JOIN project_status ON project_status.project_status_ID   = subproject_detail.project_status_ID " +
            " LEFT JOIN member ON project_detail.memberID = member.memberID " +
            " WHERE subproject_detail.memberID = '" + req.query.memberID + "'" +
            "AND subproject_detail.project_status_ID != '5' " +
            "AND subproject_detail.project_status_ID != '6' " +
            "AND subproject_detail.project_status_ID != '0'"

        //console.log(sql)
        let query = db.query(sql, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    } else {
        res.json({
            data: 'can not this status = ' + req.query.status
        })
    }
})

app.get('/task/count', (req, res) => {
    let now = new Date();
    let date_now = dateFormat(now, "yyyy-mm-dd");
    //console.log(date_now)

    if (req.query.status == 'incoming') {
        let sql = "SELECT COUNT(*) AS counts FROM project " +
            " INNER JOIN project_detail ON project.projectID = project_detail.projectID" +
            " INNER JOIN subproject ON project.projectID = subproject.projectID" +
            " INNER JOIN subproject_detail ON subproject.subProjectID = subproject_detail.subProjectID" +
            " INNER JOIN priority ON priority.priorityID  = subproject_detail.subProjectPriorityID " +
            " INNER JOIN project_status ON project_status.project_status_ID   = subproject.projectID " +
            " LEFT JOIN member ON project_detail.memberID = member.memberID " +
            " WHERE subproject_detail.memberID = '" + req.query.memberID + "'" +
            " AND subproject_detail.subProjectStart > '" + date_now + "'" +
            " AND subproject_detail.project_status_ID != '5' AND subproject_detail.project_status_ID != '6'"

        //console.log(sql)

        let query = db.query(sql, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    } else if (req.query.status == 'going') {
        let sql = "SELECT COUNT(*) AS counts FROM project " +
            " INNER JOIN project_detail ON project.projectID = project_detail.projectID" +
            " INNER JOIN subproject ON project.projectID = subproject.projectID" +
            " INNER JOIN subproject_detail ON subproject.subProjectID = subproject_detail.subProjectID" +
            " INNER JOIN priority ON priority.priorityID  = subproject_detail.subProjectPriorityID " +
            " INNER JOIN project_status ON project_status.project_status_ID   = subproject.projectID " +
            " LEFT JOIN member ON project_detail.memberID = member.memberID " +
            " WHERE subproject_detail.memberID = '" + req.query.memberID + "'" +
            " AND ((DATEDIFF(subproject_detail.subProjectStart,subproject_detail.subProjectEnd)) * 60)/100 >= DATEDIFF('" + date_now + "',subproject_detail.subProjectEnd)" +
            "AND subproject_detail.project_status_ID != '5' AND subproject_detail.project_status_ID != '6' " +
            "AND ((DATEDIFF('" + date_now + "',subproject_detail.subProjectEnd)) * 60)/100 >= 0"
        //console.log(sql)

        let query = db.query(sql, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    } else if (req.query.status == 'delayed') {
        let sql = "SELECT COUNT(*) AS counts FROM project " +
            " INNER JOIN project_detail ON project.projectID = project_detail.projectID " +
            " INNER JOIN subproject ON project.projectID = subproject.projectID " +
            " INNER JOIN subproject_detail ON subproject.subProjectID = subproject_detail.subProjectID " +
            " INNER JOIN priority ON priority.priorityID  = subproject_detail.subProjectPriorityID " +
            " INNER JOIN project_status ON project_status.project_status_ID   = subproject.projectID " +
            " LEFT JOIN member ON project_detail.memberID = member.memberID " +
            " WHERE subproject_detail.memberID = '" + req.query.memberID + "' " +
            " AND subproject_detail.subProjectEnd < '" + date_now + "' AND (subproject_detail.project_status_ID != '5' OR subproject_detail.project_status_ID != '6')"

        //console.log(sql)

        let query = db.query(sql, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    } else if (req.query.status == 'all') {
        let sql = "SELECT COUNT(*) AS counts FROM project " +
            " INNER JOIN project_detail ON project.projectID = project_detail.projectID" +
            " INNER JOIN subproject ON project.projectID = subproject.projectID" +
            " INNER JOIN subproject_detail ON subproject.subProjectID = subproject_detail.subProjectID" +
            " INNER JOIN priority ON priority.priorityID  = subproject_detail.subProjectPriorityID " +
            " INNER JOIN project_status ON project_status.project_status_ID   = subproject.projectID " +
            " LEFT JOIN member ON project_detail.memberID = member.memberID " +
            " WHERE subproject_detail.memberID = '" + req.query.memberID + "'"

        //console.log(sql)
        let query = db.query(sql, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    } else {
        res.json({
            data: 'can not this status = ' + req.query.status
        })
    }
})

app.get('/priority', (req, res) => {
    let sql = "SELECT * FROM priority"
    let query = db.query(sql, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

app.get('/status', (req, res) => {
    let sql = "SELECT * FROM project_status WHERE project_status_Name != ''"
    let query = db.query(sql, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

app.post('/project', (req, res) => {
    let projectName = req.body.projectname
    let projectDetail = req.body.detail
    let projectStart = req.body.start
    let projectEnd = req.body.end
    let priority = req.body.priorityID
    let status = req.body.statusID
    let typeID = req.body.typeID


    let sql = "INSERT INTO project(projectName,descript,projectStart,projectEnd,projectPiorityID,project_status_ID,projectTypeID)" +
        " VALUES('" + projectName + "','" + projectDetail + "','" + projectStart + "','" + projectEnd + "','" + priority + "','" + status + "','" + typeID + "')"


    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({
                status: 'error',
                detail: err
            })
        } else {
            projectID = results.insertId
            res.json({
                status: 'success',
                detail: 'create project is success',
                projectID: projectID
            })

        }
    })

})

app.post('/project/detail', (req, res) => {
    let memberID = req.body.memberID
    let userStatus = req.body.userStatus
    let comment = req.body.comment
    let projectID = req.body.projectID

    let sql = "INSERT INTO project_detail(projectID,memberID,user_project_status,projectComment) " +
        "VALUES('" + projectID + "','" + memberID + "','" + userStatus + "','" + comment + "')"
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({
                status: 'error',
                detail: err
            })
        }else {
            res.json({
                status: 'success',
                detail: 'create project is success',
                projectID: projectID
            })
        }
    })
})

app.get('/project', (req, res) => {
    let sql = ""
    if(req.query.projectID != undefined){
        sql = "SELECT * FROM project " +
        "INNER JOIN project_detail ON project_detail.projectID = project.projectID " +
        "INNER JOIN project_status ON project.project_status_ID = project_status.project_status_ID " +
        "INNER JOIN priority ON priority.priorityID = project.projectPiorityID"+
        " WHERE project_detail.memberID = '" + req.query.memberID + "' AND project.projectID = '"+req.query.projectID+"' "
    }else{
        sql = "SELECT * FROM project " +
        "INNER JOIN project_detail ON project_detail.projectID = project.projectID " +
        "INNER JOIN project_status ON project.project_status_ID = project_status.project_status_ID " +
        "INNER JOIN priority ON priority.priorityID = project.projectPiorityID"+
        " WHERE project_detail.memberID = '" + req.query.memberID + "' "

    }
    
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({
                status: 'error',
                detail: err
            })
        } else {
            res.json(results)
        }
    })
})

app.get('/project/member',(req,res) => {
    let sql = "SELECT member.fname , member.lname, member.memberID, member.picture,project_detail.user_project_status FROM project_detail  "+
    "INNER JOIN member ON member.memberID = project_detail.memberID "+
    "WHERE project_detail.projectID = '"+req.query.projectID+"'"

    let query = db.query(sql, (err, results) => {
        if (err) {
            res.json({
                status: 'error',
                detail: err
            })
        } else {
            res.json(results)
        }
    })
})
app.listen('3000', () => {     // 
    console.log('start port 3000')
})