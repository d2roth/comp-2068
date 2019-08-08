const Blog = require( '../models/blog' );

exports.index = (req, res) => {
  Blog.find()
  .published()
  .populate('author')
    .then( blogs => res.json(blogs) )
    .catch( err => res.status(404).send(err) );
};

exports.show = (req, res) => {  
  Blog.findOne({
    _id: req.params.id
  })
  .published()
    .then( (blog) => res.json(blog) )
    .catch( err => res.status(404).send(err) );
};

exports.create = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  req.body.blog.author = req.session.userId;
  // This is our form post object. The POST data is an object and has our desired keys.
  Blog.create( req.body.blog )
    .then( (blog) => res.json(blog) )
    .catch( err => res.status(400).send(err) );
};

exports.edit = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  Blog.findOne({
    _id: req.params.id,
    author: req.session.userId
  })
    .then( (blog) => res.status(201).send( {'success': 'The blog post was successfully created'} ) )
    .catch( err => res.status(404).send(err) );
};

exports.update = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  Blog.updateOne({
    _id: req.body.id,
    author: req.session.userId
  }, req.body.blog, {
    runValidators: true
  } )
    .then( (blog) => res.status(201).send( {'success': 'The blog post was successfully updated.'} ) )
    .catch( err => res.status(400).send(err) );
};

exports.destroy = (req, res) => {
  if( !req.isAuthenticated())
    return res.status(401).send({'error':'You need to sign in.'});
  
  Blog.deleteOne({
    _id: req.body.id,
    author: req.session.userId
  })
    .then( (blog) => res.status(201).send( {'success': 'The blog post was successfully destroyed.'} ) )
    .catch( err => res.status(400).send(err) );
};