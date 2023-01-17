import { http } from './config'

export default	{

	save:(contact)=>{
		return http.post('/' ,contact);
  },
    
	update:(contact)=>{
		return http.put('/' ,contact);
  },

  list:()=>{
		return http.get('/')
  },
    
	delete:(contact)=>{
		return http.delete('/' , { data: contact })
	}
}