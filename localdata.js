var emptyRow = "<tr><td colspan='6' class='text-center'> No Records Available</td></tr>";
    $(document).ready(function () {
      loadDataFromLocal();
      $('#sortable').on('click', '.btn-edit', function () {
        //debugger;
        $(".accordion__content").show();
        const emoji = $(this).parent().parent().find(".card-title__emoji").html();
        const title = $(this).parent().parent().find(".card-title__text").html();
        const body = $(this).parent().parent().find(".card-body").html();
        const id = $(this).parent().parent().find(".card-title__emoji").attr("data-id");
        $("#txtEmoji").val(emoji);
        $("#txtTitle").val(title);
        $("#txtBody").val(body);
        $("#txtId").val(id);
        $("#btnSave").text("Update ToDo");
      });

      $('#sortable').on('click', '.btn-delete', function () {
        //debugger;
        const id = $(this).parent().parent().find(".card-title__emoji").attr("data-id");
        deleteDataFromLocal(id);
      });

      $("#btnSave").click(function () {
        //debugger;
        if ($("#txtId").val() == '') {
          addDataToLocal();
        } else {
          updateDataFromLocal();
        }
      });

    //todo
      $("#btnClear").click(function () {
        //debugger;
        clearForm();
      });
    });

    function clearForm() {
      //debugger;
      $("#txtEmoji").val("");
      $("#txtTitle").val("");
      $("#txtBody").val("");
      $("#btnSave").text("Add ToDo");
    }

    //todo
    function addEmptyRow() {
      //debugger;
      if ($("#tblData tbody").children().children().length == 0) {
        $("#tblData tbody").append(emptyRow);
      }
    }

    function loadDataFromLocal() {
      //debugger;
      let localData = localStorage.getItem('localData');
      if (localData) {
        $("#sortable").html("");
        let localArray = JSON.parse(localData);
        let index = 1;
        localArray.forEach(element => {
          let dynamicTR = "<li class='ui-state-default'>";
          dynamicTR = dynamicTR + "<div class='card-title'><div class='card-title__emoji' data-id="  + element.id +  ">" + element.emoji + "</div><div class='card-title__text'>" + element.title + "</div></div>";
          dynamicTR = dynamicTR + "<div class='card-body'>" + element.body + "</div>";
          dynamicTR = dynamicTR + "<div class='card-button'>";
          dynamicTR = dynamicTR + "<button class='btn-edit anchor anchor-edit'>Edit</button>";
          dynamicTR = dynamicTR + "<button class='btn-delete anchor anchor-delete'>Delete</button>";
          dynamicTR = dynamicTR + "</div>";
          dynamicTR = dynamicTR + "</li>";
          $("#sortable").append(dynamicTR);
          index++;
        });
      }
      addEmptyRow();
    }

    function addDataToLocal() {
      //debugger;
      let localData = localStorage.getItem('localData');
      if (localData) {
        let localArray = JSON.parse(localData);
        const obj = {
          id: localArray.length + 1,
          emoji: $("#txtEmoji").val(),
          title: $("#txtTitle").val(),
          body: $("#txtBody").val()
        };
        localArray.push(obj);
        localStorage.setItem('localData', JSON.stringify(localArray));
        loadDataFromLocal();
      } else {
        const arryObj = [];
        const obj = {
          id: 1,
          emoji: $("#txtEmoji").val(),
          title: $("#txtTitle").val(),
          body: $("#txtBody").val()
        };
        arryObj.push(obj);
        localStorage.setItem('localData', JSON.stringify(arryObj));
        loadDataFromLocal();
      }
      clearForm();
    }

    function updateDataFromLocal() {
      //debugger;
      let localData = localStorage.getItem('localData');
      let localArray = JSON.parse(localData);
      const oldRecord = localArray.find(m => m.id == $("#txtId").val());
      oldRecord.emoji = $("#txtEmoji").val();
      oldRecord.title = $("#txtTitle").val();
      oldRecord.body = $("#txtBody").val();
      localStorage.setItem('localData', JSON.stringify(localArray));
      loadDataFromLocal();
      clearForm();
      $(".accordion__content").hide();
    }

    function deleteDataFromLocal(id) {
      //debugger;
      let localData = localStorage.getItem('localData');
      let localArray = JSON.parse(localData);
      let i = 0;
      while (i < localArray.length) {
        if (localArray[i].id === Number(id)) {
          localArray.splice(i, 1);
        } else {
          ++i;
        }
      }
      localStorage.setItem('localData', JSON.stringify(localArray));
      loadDataFromLocal();
    }