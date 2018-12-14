$(function () {

    var model = {
        slides: [],
        selected: 0,
        init: function () {
            slides = [
                {
                    template: "cover",
                    image: "/CloudNative/images/cloud-goku.webp",
                    title: "Cloud Native",
                    subtitle: "Pra você que sempre sonhou em voar entre as nuvens",
                    text: "<i>Uma abordagem com memes e gifs</i>"
                },
                {
                    template: "image-right",
                    image: "/CloudNative/images/senhora.gif",
                    subtitle: 'Fiquem ligados, todos estão correndo para a nuvem!',
                    text: "Na ultima década, mais e mais empresas têm transferido seus modelos de negócio para o mundo online",
                    list: [
                        "Já pegamos taxi por aplicativos",
                        "Já pedimos comida",
                        "Bancos hoje já nascem online"
                    ]
                },
                {
                    template: "image-right",
                    image: "/CloudNative/images/multiply.gif",
                    subtitle: 'Por que?',
                    text: "A adesão da computação em nuvem é feita em busca do aumento de  escalabilidade e disponibilidade das aplicações"
                },
                {
                    template: "image-right",
                    image: "/CloudNative/images/run.webp",
                    subtitle: 'Ágeis? Aqui é correria',
                    list: [
                        "Surgiram os métodos ágeis",
                        "Ambientes de desenvolvimento com ciclos de valor reduzidos",
                        "<b>Cultura DevOps</b>",
                        "Automatizações para todo o lado"
                    ]
                },
                {
                    template: "image-full",
                    image: "/CloudNative/images/travolta.gif",
                    subtitle: 'Mas e a arquitetura e o desenvolvimento? Algo mudou?'
                },
                {
                    template: "image-right",
                    image: "/CloudNative/images/obamanot.webp",
                    subtitle: 'Cloud Native',
                    list: [
                        "Microservices",
                        "Health reporting",
                        "Telemetry data",
                        "Resiliency",
                        "Declarative, not reactive"
                    ]
                },
                {
                    template: "image-right",
                    image: "/CloudNative/images/microservices.gif",
                    subtitle: 'Microservices',
                    list: [
                        "Diminuir complexidade",
                        "Mais fácil de gerenciar",
                        "Cada serviço escala livremente",
                        "Encapsulado",
                        "Equipes trabalham em serviços menores <br> e prestam manutenção no mesmo serviço"
                    ]
                },
                {
                    template: "image-right",
                    image: "/CloudNative/images/health.webp",
                    subtitle: 'Health reporting',
                    list: [
                        "Formas de expor a saúde da aplicação",
                        "Expõe o estado da aplicação",
                        "Pode ser um endpoint na api",
                        "Pode ser um webhook que a aplicação consome após realizar verificações"
                    ]
                },
                {
                    template: "image-right",
                    image: "/CloudNative/images/telemetry.gif",
                    subtitle: 'Telemetry data',
                    list: [
                        "<i>Service-level indicators (SLIs)</i>",
                        "<i>Key performance indicators (KPIs)</i>",
                        "Quantos requests estamos recebendo",
                        "Erros estão acontecendo?",
                        "Quanto tempo leva para o cliente completar um pedido?",
                        "Prometheus or InfluxDB"
                    ]
                },
                {
                    template: "regular",
                    title: "Thanks"
                }
            ],
                selected = 0
        },
        changeSelectedBy: function (operator) {
            if ( !(selected + operator < 0) && !(selected + operator > slides.length - 1) ) selected += operator;
        },
        selectedSlide: function(){
            return slides[selected]
        }
    };


    var controller = {
        init: function () {
            model.init();
            sliderView.init();
        },
        nextSlide: function () {
            model.changeSelectedBy(1);
            sliderView.render();
        },
        previewsSlide: function(index) {
            model.changeSelectedBy(-1);
            sliderView.render();
        },
        getSelectedSlide: function() {
            return model.selectedSlide();
        },
        handleKeyPress: function (e) {
            e = e || window.event;

            if (e.keyCode == '37') {
                controller.previewsSlide();
            }
            else if (e.keyCode == '39') {
                controller.nextSlide();
            }
        },
        fullScreen: function () {
            let elem = document.getElementById("full");
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
        }
    };

    var sliderView = {
        init: function () {
            $('#previous').click( () => controller.previewsSlide());
            $('#next').click( () => controller.nextSlide());
            $('#full-button').click( () => controller.fullScreen());
            document.onkeydown = controller.handleKeyPress;
            sliderView.render();
        },
        cleanUpInterface: function () {
            $('#slideArea').empty();
            $("#title").empty();
            $("#subtitle").empty();
            $('#text').empty();
            $('#list').empty();
        },
        render: function () {
            sliderView.cleanUpInterface();

            //get the selected slide
            let slide = controller.getSelectedSlide();


            //rendering information to the view
            $('#slideArea').append($(`#${slide.template}`).html());

            for (var key in slide) {
                // check if the property/key is defined in the object itself, not in parent
                if (slide.hasOwnProperty(key)) {
                    if (Array.isArray(slide[key])) {
                        slide[key].forEach(item => {
                            $(`#${key}`).append(`<li>${item}</li>`)
                        })
                    } else if (key == "image") {
                        $(`#${key}`).prop('src', slide[key]);
                    } else {
                        $(`#${key}`).html(slide[key])
                    }
                }
            }
        }
    }

    controller.init();
});