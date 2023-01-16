import { http } from './config'

export default	{

	salvar:(contato)=>{
		return http.post('/' ,contato);
  },
    
	atualizar:(contato)=>{
		return http.put('/' ,contato);
  },

  listar:()=>{
		return http.get('/')
  },
    
	apagar:(contato)=>{
		return http.delete('/' , { data: contato })
	}
}