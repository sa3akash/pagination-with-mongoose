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
