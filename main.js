const giftList = [];
const messionsList = [];

$("#add-gift").click(()=>{
    let giftText = $("#gift-field")
    if (giftText.val().length > 0){
        $(".gifts-list").append(`<li>${giftText.val()}</li>`)
        giftList.push(giftText.val())
        giftText.val("")
    }else{
        $(".gift-warning").css("visibility","visible")
        setTimeout(()=>{
            $(".gift-warning").css("visibility","hidden")
        },2000)
    }
    
})

$(".get-random-gift").click(()=>{
    if (giftList.length > 0){
        $('img').css("display","none")
        $(".your-gift-text").text(randomGift())
        $(".your-gift-text").css("display","block")
    }else{
        $(".random-gift-is").css('visibility','visible');
        setTimeout(()=>{
            $(".random-gift-is").css("visibility","hidden")
        },2000)
    }
    if (giftCountUpdate === 0 && messionsList.length > 0 && giftList.length > 0){
        setTimeout(()=>{
            $('.get-random-gift').css('display','none') 
        },1500)
    }
})

function reAddnewMission(){
    if (giftCountUpdate > 0){
        $(".your-gift-text").css("display","none")
        $('img').css("display","block")
    }
}

function randomGift(){
    let randomIndex = Math.floor(Math.random() * giftList.length)
    return giftList[randomIndex]

}
let missionCount = 0;
let giftCountUpdate = 0;
$('#add-new-mission').click((e)=>{
    e.preventDefault()
    let mession = $('#add-mission')
    if (mession.val().length > 0){
        missionCount++;
        giftCountUpdate++;
        $('.missions-nums').text(giftCountUpdate)
        let priorities = $("#priorities option:selected")
        let newMession =      `
        <div class="added-mission d-m-${missionCount} ${priorities.val()}">
            <div>
                <p class="mission-title${missionCount} m-title">${mession.val()}</p>
            </div>
                <div class="mission-options">
                    <input class='delete-btn${missionCount}' type="button" value="حذف">
                    <input class='done-btn${missionCount}' type="button" value="تم إنجازه">
                </div>
            </div>
        </div>
                `
        $(".added-missions-container").append(newMession)
        
        messionsList.push([`.mission-title${missionCount}`,`.done-btn${missionCount}`])
        mession.val("")
    }else{
        $(".mission-warning").css('visibility','visible');
        setTimeout(()=>{
            $(".mission-warning").css("visibility","hidden")
        },2000)
    }
    reAddnewMission()
    addDoneListenner([`.mission-title${missionCount}`,`.done-btn${missionCount}`])
    addDeleteListenner([`.d-m-${missionCount} `,`.delete-btn${missionCount}`])
})

function addDoneListenner(element){
    //I add number for both don btn and mission text next I going to add a listenner for each button
    if (messionsList.length > 0){
            $(element[1]).click(()=>{
                $(element[0]).toggleClass('mission-done')
                if ($(element[0]).attr('class').split(" ").includes('mission-done')){
                    giftCountUpdate--;
                    $('.missions-nums').text(giftCountUpdate);
                }else{
                    giftCountUpdate++;
                    $('.missions-nums').text(giftCountUpdate);
                }
                getGift()
            })
        }
    }

function addDeleteListenner(element){
    $(element[1]).click(()=>{
        $(element[0]).remove();
        if (giftCountUpdate>0){
            giftCountUpdate--;
        $('.missions-nums').text(giftCountUpdate);
        }
        
    })
}

function getGift(){
    if (giftCountUpdate == 0 && messionsList.length > 0){
        $('.get-random-gift').css('display','block')  
    }
}



