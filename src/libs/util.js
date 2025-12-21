function addZero(num){
      if(num<10){
            return '0'+num ;
      }
      return num;
}

export function formatTime(timeStamp){
      const date = new Date(timeStamp);
      const Y = date.getFullYear();
      const M = addZero(date.getMonth());
      const D = addZero(date.getDate());
      const h = addZero(date.getHours());
      const m = addZero(date.getMinutes());
      const s = addZero(date.getSeconds());
      return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}