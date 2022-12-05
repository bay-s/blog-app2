import React from 'react'
import supabase from '../supabase-config'

const HasComment = async (id) => {
    const { data, error } = await supabase
    .from('comment')
    .select()
    .eq('post_id',id)
    if(error){
        // alert(error.message)
    }else{
        return data
    }
}

export default HasComment