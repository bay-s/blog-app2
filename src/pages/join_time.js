

function joinTime(times){
    const date = new Date(Date.parse(times));
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
     ];


    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${month} ${day} ${year}`
}

export default joinTime;