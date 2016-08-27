var express = require('express');
var watson = require('watson-developer-cloud');

var text_to_speech = watson.text_to_speech({
  url: 'https://stream.watsonplatform.net/text-to-speech/api',
  username: '8b302e81-fa0f-4495-ba1d-cccedf2c61c0',
  password: 'RY8XSjNKB3zA',
  version: 'v1'
});

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', {
    title: '',
    text:'',
    q: "",
    answer:"",
    answers:""
  });
}).post('/', function(req, res, next) {
  var url="";
  var q=req.body.q;
  text_to_speech.synthesize({
        text: q,
        voice: "es-ES_LauraVoice"},
      function(err, response) {
        if (err){
          console.log('error:', err);
        }
        else
          {
          console.log(JSON.stringify(response, null, 2));
            if(response.classes[0].confidence>0.6){
            switch (response.top_class){
              case "formularios":
                var formulario= q.replace( /^\D+/g, '');
                  if(formulario==0 || formulario==null) formulario=572;
                  url='http://www.afip.gob.ar/genericos/formularios/archivos/pdf/f'+formulario+'.pdf';
                break;
              case "constanciaDeInscripcion":
                url='https://seti.afip.gob.ar/padron-puc-constancia-internet/ConsultaConstanciaAction.do';
                break;
              case "Constatacion":
                if(q.toLowerCase().indexOf("cai") > -1) {
                  if(q.toLowerCase().indexOf("sin") > -1){
                    url="https://servicios1.afip.gov.ar/genericos/comprobantes/sincai.aspx";
                  }else{
                    url="https://servicios1.afip.gov.ar/genericos/comprobantes/cai.aspx";
                  }
                }else{
                  if(q.toLowerCase().indexOf("caea") > -1){
                    url="https://servicios1.afip.gov.ar/genericos/comprobantes/caea.aspx";
                  }else{
                    url="https://servicios1.afip.gov.ar/genericos/comprobantes/cae.aspx";
                  }
                }
                break;
              case "actividadesEconomicas":
                url="https://servicios1.afip.gob.ar/genericos/nomencladorActividades/index.aspx";
                break;
              default:
                res.status(200).render('index' , {
                  title:"Resultado de clasificación:",
                  q: q,
                  answer:response.top_class,
                  answers:response.classes
                });
            }
            res.writeHead(301,
                {
                  Location: url
                }
            );
            res.end();
            }else{
              res.status(200).render('index' , {
                title:"Upps.. Algo salió mal",
                text:"Lo sentimos.. No pudimos comprender lo que dijiste. Te referis a "+response.top_class+"??",
                q: q,
                answer:response.top_class,
                answers:response.classes
              });
            }
          }
      });
});

module.exports = router;


module.exports = router;
