
import supabase from "../supabase-config";



const PushNotifications =  async (type,rid,url,uid) => {

  const { data, error } = await supabase
 .from('notification')
  .insert([
    {
      receive_id:rid,
      sender_id:uid,
      url_id:url,
      type:type,
      notif_info:''
     }
  ])
 if(error) console.log(`Something wrong in notification ${error.message}`);
 else {
   console.log(data);
   console.log('^ PUSH NOTIFICATIONS SUCCESS ^');
   return data
 }
}

export default PushNotifications;