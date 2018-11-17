$(function () {

    var model = {
        slides: [],
        selected: 0,
        init: function () {
            slides = [
                {
                    title: "Ricardo Nogueira",
                    subtitle: "CTO at Absam",
                    text: "UnitTest x TDD x BDD - What the fuck is that shit"
                },
                {
                    title: "DEMO",
                    subtitle: "Alguém me ajuda aqui?"
                },
                {
                    title: "Unit Test",
                    subtitle: "Faça como Elize Matsunaga, divida tudo em pequenas partes",
                    list: [
                        "teste das menores unidades de código do seu sistema",
                        "devem ser isolados de qualquer dependência",
                        "simples, fácil de escrever e rodar."
                    ]
                },
                {
                    title: "TDD",
                    subtitle: '"Make it work. Make it right. Make it fast." - Kent Beck',
                    text: "A especificação dos teste antecedem o desenvolvimento do código",
                    list: [
                        "RED, GREE, REFACTOR",
                        "Escreve-se testes que não irão passar - RED",
                        "Desenvolve-se o mínimo de código necessário para passar nos testes - GREEN",
                        "Refatora-se o código para melhorar performance e organização",
                        "É importante que os testes também sejam incrementados"
                    ]
                },
                {
                    title: "Why TDD?",
                    subtitle: '"Eu não falhei. Apenas descobri 10 mil maneiras que não funcionam." - Thomas Edison',
                    list: [
                        "Segurança na realização de modificações",
                        "Maior confiabilidade do código",
                        "Grande cobertura de código",
                        "Quanto mais erros você descobre, menos problemas são passados para o cliente",
                        "Quanto mais específico o teste fica, mais generalista o código fica"
                    ]
                },
                {
                    title: "BDD",
                    subtitle: "Não teste implementação, teste comportamento",
                    list: [
                        "Conjunto de boas praticas para escrita de testes",
                        "Integram-se regras de negócio com linguagem de programação",
                        "Teste costumam ser escritos com linguagem mais próxima aos clientes",
                        "Pessoas de fora da equipe de desenvolvimento participam da especificação dos testes"
                    ]
                },
                {
                    title: "Why BDD?",
                    subtitle: "Abstrai-se como o sistema foi desenvolvido, e importa-se em como ele funciona",
                    list: [
                        "Comunicação entre as equipes",
                        "Documentação dinâmica",
                        "Visão do todo",
                        "Software funcionando do jeito que o cliente precisa"
                    ]
                },
                {
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
        }
    };

    var sliderView = {
        init: function () {
            $('#previous').click( () => controller.previewsSlide());
            $('#next').click( () => controller.nextSlide());
            document.onkeydown = controller.handleKeyPress;
            sliderView.render();
        },
        cleanUpInterface: function () {
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
            if (slide.title) $("#title").html(slide.title);
            if (slide.subtitle) $("#subtitle").html(slide.subtitle);
            if (slide.text) $("#text").html(slide.text);
            if (slide.list && slide.list.length > 0) {
                slide.list.forEach(item => {
                    $('#list').append(`<li>${item}</li>`)
                })
            }
        }
    }

    controller.init();
});