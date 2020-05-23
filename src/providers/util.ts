export class Util{
  toCamelCase(str) {
    return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
  }

  toDate(dateStr) {
    const [day, month, year] = dateStr.split("/")
    return new Date(year, month - 1, day)
  }

   removeAcento(text){
    if(text){
      text = text.toLowerCase();
      text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
      text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
      text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
      text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
      text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
      text = text.replace(new RegExp('[Ç]','gi'), 'c');
    }
    return text;
  }
}
