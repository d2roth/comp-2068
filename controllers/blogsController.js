const Blog = require( '../models/blog' );

exports.index = (req, res) => {
  req.isAuthenticated();
  Blog.find({
    author: req.session.userId
  })
  .populate('author')
    .then( blogs => {
      res.render('blogs/index', {
        blogs: blogs,
        title: 'Blog Archive'
      })
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      req.redirect('/');
    });
};

exports.drafts = (req, res) => {
  req.isAuthenticated();
  Blog.find({
    author: req.session.userId
  }).drafts()
  .populate('author')
    .then( blogs => {
      res.render('blogs/index', {
        blogs: blogs,
        title: 'Blog Archive'
      })
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      req.redirect('/');
    });
};

exports.published = (req, res) => {
  req.isAuthenticated();
  Blog.find({
    author: req.session.userId
  }).published()
  .populate('author')
    .then( blogs => {
      res.render('blogs/index', {
        blogs: blogs,
        title: 'Blog Archive'
      })
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      req.redirect('/');
    });
};

exports.show = (req, res) => {
  req.isAuthenticated();
  Blog.findOne({
    _id: req.params.id,
    author: req.session.userId
  })
  .then( (blog) => {
    res.render( 'blogs/show', {
      blog: blog,
      title: blog.title
    })
  })
  .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      req.redirect('/');
  });
};

exports.new = (req, res) => {
  req.isAuthenticated();
  res.render( 'blogs/new', {
    title: 'New Blog Post'
  } );
};

exports.edit = (req, res) => {
  req.isAuthenticated();
  Blog.findOne({
    _id: req.params.id,
    author: req.session.userId
  })
  .then( (blog) => {
    res.render( 'blogs/edit', {
      blog: blog,
      title: blog.title
    })
  })
  .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      req.redirect('/');
  });
};

exports.create = (req, res) => {
  req.isAuthenticated();

  req.body.blog.author = req.session.userId;
  // This is our form post object. The POST data is an object and has our desired keys.
  Blog.create( req.body.blog )
    .then(() => {
      req.flash('success', `Post successfully created!`);
      res.redirect( `/arcadeGames` );
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      req.redirect('/arcadeGames/new');
    });
};

exports.update = (req, res) => {
  req.isAuthenticated();
  Blog.updateOne({
    _id: req.body.id,
    author: req.session.userId
  }, req.body.blog, {
    runValidators: true
  } )
  .then(() => {
    req.flash('success', `Post successfully updated!`);
    res.redirect( `/blogs/${req.body.id}` );
  })
  .catch(err => {
    req.flash('error', `ERROR: ${err}`);
    res.redirect( `/blogs/${req.body.id}/edit` );
  });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();
  Blog.deleteOne({
    _id: req.body.id,
    author: req.session.userId
  })
  .then(() => {
    req.flash('success', `Post successfully deleted!`);
    res.redirect( `/blogs` );
  })
  .catch(err => {
    req.flash('error', `ERROR: ${err}`);
    res.redirect( `/blogs` );
  });
};