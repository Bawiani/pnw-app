function PrintElem(elem){
    var printContents = document.getElementById(elem).innerHTML;
    // var originalContent = document.body.innerHTML;
    // // window.open("","_blank","")
    // document.body.innerHTML = printContents;
    // window.print();
    // // window.location.reload();
    // document.body.innerHTML = originalContent;
    // window.close()
    // return true;
    var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
    winPrint.document.write(printContents);
    winPrint.document.close();
    winPrint.focus();
    winPrint.print();
    winPrint.close(); 
}

export {PrintElem};