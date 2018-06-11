function getDetails(obj, uuid) {
    $("#edit-" + obj + "-uuid").val(uuid);
    data = {'uuid': uuid, 'obj': obj, '_xsrf': getCookie("_xsrf")}
    $.post('/admin/ajax/objects', data, function(response) {
        $.each(response, function(key, value) {
            if (obj === "hint") {
                if (key === "flaglist") {
                    $('#hint-flag_uuid').empty();
                    $('#hint-flag_uuid').append($('<option/>', { 
                        value: "",
                        text : ""
                    }));
                    $.each(value, function (uuid, name) {
                        $('#hint-flag_uuid').append($('<option/>', { 
                            value: uuid,
                            text : name
                        }));
                    });
                    $('#hint-flag_uuid option[value=' + response["flag_uuid"] + ']').prop('selected',true);   
                } else if (key !== "flag_uuid") {
                    $("#" + obj + "-" + key).val(value);
                }
            } else if (obj === "flag" && key === "lock_uuid") {
                $('#edit-flag-lock option[value=' + value + ']').prop('selected',true);
            } else {
                $("#" + obj + "-" + key).val(value);    
            }
        });
    }, 'json');
}

function getBoxFlags(box_uuid, flag_uuid) {
    data = {'uuid': box_uuid, 'obj': 'box', '_xsrf': getCookie("_xsrf")}
    $.post('/admin/ajax/objects', data, function(response) { 
        $('#edit-flag-lock').empty();
        $('#edit-flag-lock').append($('<option/>', { 
            value: "",
            text : ""
        }));
        $.each(response["flaglist"], function(uuid, name) {    
            if (uuid !== flag_uuid) {
                $('#edit-flag-lock').append($('<option/>', { 
                    value: uuid,
                    text : name
                }));
            } 
        });
    }, 'json');
}

/* Add click events */
$(document).ready(function() {

    /* Corporation */
    $("a[id^=edit-corporation-button]").click(function() {
        getDetails("corporation", $(this).data("uuid"));
    });

    $("#edit-corporation-submit").click(function() {
        $("#edit-corporation-form").submit();
    });

    $("a[id^=delete-corporation-button]").click(function() {
        $("#delete-corporation-uuid").val($(this).data("uuid"));
    });

    $("#delete-corporation-submit").click(function() {
        $("#delete-corporation-form").submit();
    });

    /* Box */
    $("a[id^=edit-box-button]").click(function() {
        getDetails("box", $(this).data("uuid"));
        $("#edit-box-corporation").val($(this).data("corporation-uuid"));
    });

    $("#edit-box-submit").click(function() {
        $("#edit-box-form").submit();
    });

    $("a[id^=delete-box-button]").click(function() {
        $("#delete-box-uuid").val($(this).data("uuid"));
    });

    $("#delete-box-submit").click(function() {
        $("#delete-box-form").submit();
    });

    /* IP Address */
    $("#add-ip-address-submit").click(function() {
        $("#add-ip-address-form").submit();
    });

    $("a[id^=add-ip-address-button]").click(function() {
        $("#add-ip-address-uuid").val($(this).data("uuid"));
    });

    $("#delete-ip-address-submit").click(function() {
        $("#delete-ip-address-form").submit();
    });

    $("a[id^=delete-ip-address-button]").click(function() {
        $("#delete-ip-address-uuid").val($(this).data("uuid"));
    });

    /* Flag */
    $("a[id^=edit-flag-button]").click(function() {
        getBoxFlags($(this).data("box-uuid"), $(this).data("uuid"));
        getDetails("flag", $(this).data("uuid"));
        $("#edit-flag-box").val($(this).data("box-uuid"));
    });

    $("#edit-flag-submit").click(function() {
        $("#edit-flag-form").submit();
    });

    $("a[id^=delete-flag-button]").click(function() {
        $("#delete-flag-uuid").val($(this).data("uuid"));
    });

    $("#delete-flag-submit").click(function() {
        $("#delete-flag-form").submit();
    });

    /* Hint */
    $("a[id^=edit-hint-button]").click(function() {
        getDetails("hint", $(this).data("uuid"));
    });

    $("#edit-hint-submit").click(function() {
        $("#edit-hint-form").submit();
    });

    $("a[id^=delete-hint-button]").click(function() {
        $("#delete-hint-uuid").val($(this).data("uuid"));
    });

    $("#delete-hint-submit").click(function() {
        $("#delete-hint-form").submit();
    });

});