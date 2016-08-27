var BustrapApp = angular.module('BustrapApp', []);

    BustrapApp.controller('bustrapController', function($scope,$http) {



    $scope.nombre ="Daniel"
    $scope.tiempoDeArribo =30
    $scope.resp ="Hola "+$scope.nombre+". El próximo colectivo llega en "+$scope.tiempoDeArribo+" minutos. Espero que tengas un excelente viaje";

           // $scope.actualizar = function(text){
           // 	$scope.resp ='Hola Daniel. El próximo colectivo llega en 30 minutos. Espero que tengas un excelente viaje';
           
        //}
       


    $(document).ready(function(){


    $( "#escuchar" ).click(function() {
        $.playSound("https://8b302e81-fa0f-4495-ba1d-cccedf2c61c0:RY8XSjNKB3zA@stream.watsonplatform.net/text-to-speech/api/v1/synthesize?voice=es-ES_LauraVoice&text="+$scope.resp);
    });

    });

    



    }



);

