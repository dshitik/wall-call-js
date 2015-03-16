function MainAjax() {
    this.taskForm = function(param) {
            $.ajax({
                type: "POST",
                url: "controller/TaskForm.php",
                data: param,
                dataType: "html",
                success: function (data) {
                        $('.dynamic_task_block').html(data);
                },
                failure: function () {
                    alert("error");
                }
            });
            return false;
    }
}
var aja = new MainAjax();


