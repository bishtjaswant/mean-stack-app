import express from 'express';
/** issues model */
import issuesModel from '../model/issues';

const router = express.Router();

// all issues
/**
 * url
 * http://localhost:8080/api/issues
 */
router.route('/issues').get((req, res) => {

          issuesModel.find( function (err, issues) {  
              if (err) {
                  console.log('error in issuse '+err);
              } else {
                  if (!issues) {
                      return res.json({status: false, message: 'there are no issues yet'});
                  } else {
                      return res.json(issues); // if has
                      
                  }
              }

          })


});



// specific issues 
/** url
 * http://localhost:8080/api/issues/12
 */
router.route('/issues/:id').get(function (req, res) { 
    
             if (!req.params.id) {
                 return res.json({ status: false, message: 'oops it is look like issues id were not provided' });
             } else {
                 issuesModel.findById(req.params.id, function (err, issueId) { 
                            if (err) {
                                console.log('invalid id or ' + err);
                                return res.json({ status: false, message: 'invalid or wrong ID' });
                            } else {
                                if (!issueId) {
                                    return res.json({ status: false, message: 'sorry we have no issues regarding to this ID' });
                                } else  {
                                    return res.json({ status: true, updateBlog: issueId });
                                }

                            }
                  });
                  
             }
 });


//  adding records
/**
 * url
 * http://localhost:8080/api/issues/create
 */
router.route('/issues/create').post(function (req, res) {

     
    if (!req.body.issue || !req.body.responsible || !req.body.descriptions || !req.body.severity  ) {
                 return res.json({ status: false, message: 'All field are required to submit issues' });
                     
             } else {
       
                //  storing issues
                let userIssues = new issuesModel({
                    issue: req.body.issue,
                    responsible : req.body.responsible,
                    descriptions : req.body.descriptions,
                    severity: req.body.severity, 
                    status: req.body.status, 
                });

                userIssues.save()
                     .then(function (issue ) {
                    res.status(200).json({ status: true, message: 'thank you your issue has been added. we will take steps soon as posible' });

                  })
                  .catch(function (err) { 
                      res.status(400).json({ status: false, message: 'failed to added issues. try again later' });
                      console.log('failed to added issues. try again later');     
                   });
                     
        }
                
 });



// update specific record/issue
/**url
 * http://localhost:8080/api/issues/update/id
 */
router.route('/issues/update/:id').put(function (req,res) {
         if (!req.params.id) {
             return res.json({ status: false, message: 'oops it is look like issues update id were not provided' });
           
            } else {
                
                // if some field  missed
             if (!req.body.issue || !req.body.responsible || !req.body.descriptions || !req.body.severity || !req.body.status ) {
                 return res.json({ status: false, message: 'All field are required to updates issues' });
                    
               } else {
                    // check id is valid or not
                    issuesModel.findById(req.params.id, function (err , updateIssue) {
                            if (err) {
                                return res.json({ status: false, message: 'invalid issue or wrong update id' });
                                
                            } else {
                                
                                if (!updateIssue) {
                                   return next(new Error('could not load document yet'))                         
                                } else {
                                    //  finally update
                                    updateIssue.issue = req.body.issue,
                                    updateIssue.responsible  = req.body.responsible,
                                    updateIssue.descriptions  = req.body.descriptions,
                                    updateIssue.severity = req.body.severity,
                                    updateIssue.status = req.body.status
                                //    saving updated recoords
                                    updateIssue.save()
                                    .then(issues=>  { 
                                        return res.status(200).json({ status: true, message: 'successfully updated' });

                                    } ).catch(err => {
                                        return res.status(400).json({ status: false, message: 'could not update' });
                                    });
                                }
                            }
                      });
               }

           }
  });



// deletion
/**
 * url
 * http://localhost:8080/api/issues/remove/id *
 */
router.route('/issues/remove/:id').delete(function (req,res) {
            //   find and delete
            issuesModel.findByIdAndRemove({_id: req.params.id}, function(err, deleted ) {
                     if (err) {
                         return res.status(400).json({ status: false, message: 'invalid delete id' });
                         
                     } else {
                        if (!deleted) {
                            return res.status(400).json({ status: false, message: ' delete record not found or it is already deleted' });
                        } else {
                            return res.status(200).json({ status: true, message: ' issues deleted successfully.' });                            
                        }
                     }
            } );

  });

// exporting  routing module
export  default router;
