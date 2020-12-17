function convert()
{
    let text = document.querySelector("[name=Text1]").innerHTML;
    text = text.replace(/([^a-z])'|'([^a-z])/gi,'$1"$2');
    document.querySelector("[name=Text2]").innerHTML = text;
}