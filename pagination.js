var perPage = 10
  , page = Math.max(0, req.params.page)

Event.find()
    .select('name')
    .limit(perPage)
    .skip(perPage * page)
    .sort({
        name: 'asc'
    })
    .exec(function(err, events) {
        Event.count().exec(function(err, count) {
            res.render('events', {
                events: events,
                page: page,
                pages: count / perPage
            })
        })
    })


/////////////////////////////////////////////////////////


49

In this case, you can add the query page and/ or limit to your URL as a query string.

For example:
?page=0&limit=25 // this would be added onto your URL: http:localhost:5000?page=0&limit=25

Since it would be a String we need to convert it to a Number for our calculations. Let's do it using the parseInt method and let's also provide some default values.

const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
}

sexyModel.find()
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .exec(function (err, doc) {
        if(err) { res.status(500).json(err); return; };
        res.status(200).json(doc);
    });
