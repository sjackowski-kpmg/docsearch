// This file contains SQL queries

var options = {

};

var dbconfig = require('./dbconfig.json');

var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://stevenjackowski@localhost:5432/stevenjackowski';
// var cn = {
//   host: 'localhost',
//   port: 5432,
//   database: 'stevenjackowski',
//   user: 'stevenjackowski'
// };

var db = pgp(dbconfig);

function searchResumes(req, res, next) {

  var queryString = `
  select
    id, score
  from
  (
  select id, ts_rank_cd(to_tsvector('english', text_data), $1) as score,
    to_tsvector('english', text_data) @@ to_tsquery('english', $1) as term_found
  from docstore.resume
  order by score desc
  ) q where q.term_found = TRUE;`;

  var searchString = req.params.searchString;
  db.any(queryString, searchString)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  searchResumes: searchResumes
};


