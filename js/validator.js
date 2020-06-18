$(document).ready(function() {

    $("#guttable").tablesorter({
        theme: 'green'
    });

    $("table").delegate("#remove", "click", function() {
        $(this).closest("tr").remove();
        $("#guttable").trigger("updateAll");
        return false;
    });
    var iamhere;
    $("table").delegate("#edit", "click", function() {
        iamhere = $(this).closest("tr");
        $("#towar_name").val(iamhere.find("#name").text());
        $("#towarkey").val(iamhere.find("#kod").text());
        $("#cena_netto").val(iamhere.find("#netto").text());
        $("#stawka_VAT").val(iamhere.find("#vat").text());
        myFunction();
        var select = [];
        iamhere.find("#otowar > p").each(function() {
            select.push($(this).text());
        });
        $(".myCheckBox").each(function() {
            this.checked = false;
        })
        $(".myCheckBox").each(function() {
            objectt = this;

            val = this.value;
            select.forEach(function(temp) {
                if (val == temp) {
                    objectt.checked = true;
                }
            })
        })
        var form_table8 = iamhere.find("#ocena").text();
        $(".form-check-input").each(function() {
            if (this.value == form_table8) {
                this.checked = true;
            } else {
                this.checked = false;
            }
        });
        $("#button").hide()
        $("#buttonedit").show()

        $("#guttable").trigger("updateAll");
        return false;

    });
    $("#Jtable").on("click", function() {
        $.getJSON("table.json", function(data) {
            $.each(data, function(key, val) {
                $("#guttable").find('tbody').append(this).trigger('addRows', [this]);

            })
            $("#guttable").trigger("updateAll")
        })
    })
    $("#buttonedit").on("click", function() {
        iamhere

        var checkBoxes = document.getElementsByClassName('myCheckBox');
        iamhere.find("#name").html($("#towar_name").val());
        iamhere.find("#kod").html($("#towarkey").val());
        iamhere.find("#netto").html($("#cena_netto").val());
        iamhere.find("#vat").html($("#stawka_VAT").val());
        iamhere.find("#brutto").html($("#cena_brutto").val());
        iamhere.find("#kategoria").html($("#categori").val());
        var row = "";
        for (var i = 0, l = checkBoxes.length; i < l; i++) {
            if (checkBoxes[i].type == 'checkbox' && checkBoxes[i].checked) {
                row = row + "<p>" + checkBoxes[i].value + "</p>";
            }
        }
        iamhere.find("#otowar").html(row);
        iamhere.find("#ocena").html($("input[name='inlineRadioOptions']:checked").val());
        iamhere.find("#imag").html("dummy.png");

        $("#guttable").trigger("updateAll");
        $("#button").show()
        $("#buttonedit").hide()
    })
    $("table").delegate("#kosz", "click", function() {
        var tablica = [
            [
                $(this).closest("tr").find("#name").text(), $(this).closest("tr").find("#brutto").text(), 1
            ]
        ];

        var koszykAktualny = localStorage.getItem('koszyk');
        var daneDoTabelki
        var temp = true;
        if (koszykAktualny == null) { daneDoTabelki = tablica } else {
            var daneDoTabelki = JSON.parse(koszykAktualny);
            $.each(daneDoTabelki, function(i) {

                if (jQuery.inArray(daneDoTabelki[i][0], tablica[[0]]) === -1) {


                } else {
                    temp = false;
                    daneDoTabelki[i][2] += 1;
                }
            })
            if (temp) {

                daneDoTabelki.push(tablica[0]);
            }
        }
        var zebraneDane = JSON.stringify(daneDoTabelki);

        localStorage.setItem('koszyk', zebraneDane);
        /*else {
            localStorage.setItem('koszyk', koszykAktualny + zebraneDane);
        }*/
    })
    var suma = 0.0;
    $('#exampleModal').on('shown.bs.modal', function() {
        var koszykAktualny = localStorage.getItem('koszyk');
        var daneDoTabelki = JSON.parse(koszykAktualny);

        var Tabelka = "<table><tr><td> nazwa </td><td> cena brutto </td><td> ilość </td></tr>";

        suma = 0.0;
        $.each(daneDoTabelki, function() {
            Tabelka += "<tr><td> " + this[0] + " </td><td> " + this[1] + " </td><td> " + this[2] + " </td></tr>"
            suma += parseFloat(this[1]) * parseFloat(this[2]);
        })
        Tabelka += "</Table>";

        $("#suma").html((suma + parseFloat($("#wysylka").val())).toFixed(2));
        var modal = $(this)
        modal.find('.modal-title').text('zawartość koszyka')

        modal.find('.modal-body span').html(Tabelka)
        $('#myInput').trigger('focus')
    })
    $('#wysylka').change(function() {
        $("#suma").html((suma + parseFloat($("#wysylka").val())).toFixed(2));
    });
});
var chekto = 0;

function sprawdzTowarName() {
    var formularz_obj = document.getElementById("towar_name");
    var t_name = formularz_obj.value;
    var blad = document.getElementById("towar_name_blad");
    var objRegExp = /^[a-zA-Z]+$/;

    if (t_name === "" || !(t_name.match(objRegExp))) {
        blad.innerHTML = "Podaj nazwe towaru";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = false;
        chekto1 = 0;
    } else if (t_name.length > 10) {
        blad.innerHTML = "Zadluga nazwa (max 10 znakow)";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
        chekto1 = 0;
    } else {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = "";
        blad_danych = false;
        chekto1 = 1;
    }
    return blad_danych;
}

function sprawdzTowarKey() {
    var formularz_obj = document.getElementById("towarkey");
    var t_name = formularz_obj.value;
    var blad = document.getElementById("towar_key_blad");
    var objRegExp = /[a-zA-Z0-9]{2}-[a-zA-Z0-9]{2}/;

    if (t_name === "" || !(t_name.match(objRegExp))) {
        blad.innerHTML = "Podaj klucz towaru (kod towaru powinien być XX-XX i może składać się z cyfr i liter)";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = false;
        chekto = 0;
    } else if (t_name.length > 5) {
        blad.innerHTML = "Zadluga nazwa (max 5 znakow)";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = true;
        chekto = 0;
    } else {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = "";
        blad_danych = false;
        chekto = 1;
    }
    return blad_danych;
}

function myFunction() {
    var x = document.getElementById("cena_netto");
    var y = document.getElementById("stawka_VAT");
    var z = document.getElementById("cena_brutto");
    c = Number(x.value * ((100 + Number(y.value)) / 100));
    z.value = c.toFixed(2);
}

function Walidacjia() {

    var formularz_obj = document.getElementById("cena_netto");
    var t_name = formularz_obj.value;
    var blad = document.getElementById("netto_bad");
    var c = Number(formularz_obj.value);
    if (t_name === "") {
        blad.innerHTML = "Podaj Cenne Netto towaru";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = false;
        chekto2 = 0;
    } else {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = "";
        formularz_obj.value = c.toFixed(2);
        blad_danych = false;
        chekto2 = 1;
    }
}

function Walidacjiastawki() {
    var formularz_obj = document.getElementById("stawka_VAT");
    var t_name = formularz_obj.value;
    var blad = document.getElementById("zla_stawka");

    if (t_name === "") {
        blad.innerHTML = "Podaj Stawke Vat towaru";
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych = false;
        chekto3 = 0;
    } else {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = "";
        blad_danych = false;
        chekto3 = 1;
    }
}

function valthischeck() {
    var formularz_obj = document.getElementById("red_box");
    var blad = document.getElementById("wrong_box");
    var checkBoxes = document.getElementsByClassName('myCheckBox');
    var okay = 0;
    var bad_form = document.getElementById("gutto_divo");
    for (var i = 0, l = checkBoxes.length; i < l; i++) {
        if (checkBoxes[i].checked) {
            okay = okay + 1;
        }
    }
    if (okay > 1) {
        var form_table = document.getElementById("towar_name");
        var form_table2 = document.getElementById("towarkey");
        var form_table3 = document.getElementById("cena_netto");
        var form_table4 = document.getElementById("stawka_VAT");
        var form_table5 = document.getElementById("cena_brutto");
        var e = $("#categori option:selected").val();
        var form_table8 = $("input[name='inlineRadioOptions']:checked").val()
        blad.innerHTML = "";
        var change = true;
        $("#guttable >tbody> tr >#name").each(function() {
            if ($(this).text() == form_table.value) {
                change = false;
            }
        });

        if (change) {
            if (chekto && chekto1 && chekto2 && chekto3) {


                bad_form.innerHTML = "<h3>wszystko wypełniono poprawnie</h3>";
                bad_form.classList.remove("invalid-feedback");
                formularz_obj.classList.remove("is-invalid");
                bad_form.classList.add("valid-feedback");
                formularz_obj.classList.add("is-valid");


                var row = "<tr><td id='name'>" + form_table.value + "</td><td id='kod'>" + form_table2.value + "</td><td id='netto'>" + form_table3.value + "</td><td id='vat'>" + form_table4.value + "</td><td  id='brutto'>" + form_table5.value + "</td><td  id='kategoria'>" + e + "</td><td  id='otowar'>";
                for (var i = 0, l = checkBoxes.length; i < l; i++) {
                    if (checkBoxes[i].type == 'checkbox' && checkBoxes[i].checked) {
                        row = row + "<p>" + checkBoxes[i].value + "</p>";
                    }
                }
                row = row + "</td><td  id='ocena'>" + form_table8 + "</td><td  id='imag'> dummy.jpg </td><td><button class='btn btn-danger' id='remove'>usuń</button><button class='btn btn-primary' id='edit' >edytuj</button><button class='btn btn-primary' id='kosz'>kosz</button></td>";
                $row = $(row),
                    callback = function() {};

                $("#guttable").find('tbody').append($row).trigger('addRows', [$row]);
                $("#guttable").tablesorter({
                    theme: 'green'
                });
                $("#guttable").trigger("updateAll");
                return false;

            } else {
                bad_form.innerHTML = "<h3>Nie wypełniono wszytkiego</h3>";

                bad_form.classList.add("invalid-feedback");
                return false;
            }
        } else {
            bad_form.innerHTML = "<h3>W tableli istniejee juz takie towar</h3>";
            bad_form.classList.add("invalid-feedback");
        }
    } else {

        blad.innerHTML = "Nie zaznaczono checkbox (min 2)";
        bad_form.innerHTML = " ";
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        return false;
    }
}

function sortineg() {

    switch ($("#sort-opt option:selected").val()) {
        case "prilowtohigh":
            $("#guttable").trigger("sorton", [
                [
                    [4, 0]
                ]
            ]);
            break;
        case "prihighttolow":

            $("#guttable").trigger("sorton", [
                [
                    [4, 1]
                ]
            ]);
            break;
        case "tohigh":

            $("#guttable").trigger("sorton", [
                [
                    [7, 0]
                ]
            ]);
            break;
        case "tolow":
            $("#guttable").trigger("sorton", [
                [
                    [7, 1]
                ]
            ]);
            break;
        case "nameAZ":
            $("#guttable").trigger("sorton", [
                [
                    [0, 0]
                ]
            ]);
            break;
        case "nameZA":
            $("#guttable").trigger("sorton", [
                [
                    [0, 1]
                ]
            ]);

            break;
    }
}

function zakup() {

    localStorage.removeItem('koszyk');

}