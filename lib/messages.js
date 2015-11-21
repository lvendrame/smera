module.exports = {
  ok: ok,
  created: created,
  noContent: noContent,
  error: error,
  badRequest: badRequest,
  unauthorized: unauthorized,
  forbiden: forbiden,
  notFound: notFound
};

function ok(item, response){
  if(item){
    response.send(item);
  }else{
    response.sendStatus(200);
  }
}

function created(item, response) {
  response.status(201).send(item);
}

function noContent(response){
  response.sendStatus(204);
}

function error(err, response){
    response.status(500).send(err);
}

function badRequest(response){
  response.sendStatus(400);
}

function unauthorized(response){
  response.sendStatus(401);
}

function forbiden(response){
  response.sendStatus(403);
}

function notFound(response){
  response.sendStatus(404);
}
