$("#selectpicker").selectpicker("refresh")

$("#selectpicker").off("shown.bs.select").on("shown.bs.select", function(e, clickedIndex, isSelected, oldValue) {
    e.stopPropagation()
    $("#selectpicker").selectpicker("refresh")

    let count = 0
    $(".bs-searchbox input").off("keydown").on("keydown", function(event){
        event.stopPropagation();

        if (event.keyCode == 13) {
            count++
            if(count == 1) {
                const keyword = $(".bs-searchbox input").val()
                $("#selectpicker").append('<option value="'+ keyword + '"><p style="color: black;">' + keyword +  '</p></option>').selectpicker('refresh');
                setTimeout(()=>{
                    $('#selectpicker').selectpicker('val', keyword)
                    const inputbox = document.getElementById("selectpicker")
                    inputbox.dispatchEvent(new Event("change"))
                }, 100)
            }
        }
    })
})


