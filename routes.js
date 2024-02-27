const express = require("express");
const router = express.Router();

//** IMPORTAÇÃO USUARIOS **/
const UsuarioController = require('./src/controller/Usuario/index');
const CreateUsuario = require('./src/controller/Usuario/CreateUsuario');
const GetUsuariosController = require('./src/controller/Usuario/GetUsuariosController')
const DeleteUsuarioController = require('./src/controller/Usuario/DeleteUsuarioController')
const UsuarioMiddleware = require('./src/middleware/Usuario/index');


//** IMPORTAÇÃO INVESTIMENTOS **/
const CreateInvestimentoController = require('./src/controller/Investimentos/CreateInvestimentoController');
const GetAllInvestimentosController = require('./src/controller/Investimentos/GetAllInvestimentosController');
const UpdateInvestimentoController = require('./src/controller/Investimentos/UpdateInvestimentoController');
const DeleteInvestimentoController = require('./src/controller/Investimentos/DeleteInvestimentoController');
const GetInvestimentoByUsuarioController = require('./src/controller/Investimentos/GetInvestimentosByUsuarioController');
const ListCompraAtivosController = require('./src/controller/Investimentos/ListCompraAtivosController');
const GetInvestimentoByIdController = require('./src/controller/Investimentos/GetInvestimentoByIdController')
const GetInvestimentosVendaByPapelController = require('./src/controller/Investimentos/GetInvestimentosVendaByPapelController');
const RegistarVendaController = require('./src/controller/Investimentos/RegistrarVendaController');
const RegistrarInvestimentoByPlanilha = require('./src/controller/Investimentos/CreateInvestimentoByListController')

//** IMPORTAÇÃO CONTADORES **/
const GetContadoresByUsuarioId = require('./src/controller/Contadores/ContadoresController');

const getAllTipoAtivos = require('./src/controller/TipoAtivo/getAllTipoAtivosController');

const LoginController = require('./src/controller/Login/Login');



const app = express();

//ROTAS LOGIN
router.post('/login', LoginController.Login);

//ROTAS USUARIOS
router.get('/Usuarios', GetUsuariosController.GetAllusuarios);
router.get('/Usuario/:CPF',  GetUsuariosController.GetUsuarioByCPF);
router.get('/UsuarioById/:ID', GetUsuariosController.GetUsuarioById);
router.post('/Usuario', UsuarioMiddleware.validaFormulario, CreateUsuario.CreateUsuario);
router.put('/Usuario/:ID',  UsuarioController.UpdateUser);
router.delete('/Usuario/:ID',  DeleteUsuarioController.DeleteUsuario);



//ROTAS DE INVESTIMENTOS - TIPO INVESTIMENTO
 router.get('/investimentos/', GetAllInvestimentosController.GetAllInvestimentosController);
 router.post('/investimento/', CreateInvestimentoController.CreateInvestimentoController);
 router.put('/investimento/:ID', UpdateInvestimentoController.UpdateInvestimentoController);
 router.delete('/investimento/:ID', DeleteInvestimentoController.DeleteInvestimentoController);
 router.get('/meusInvestimentos/:USUARIO_ID', GetInvestimentoByUsuarioController.GetInvestimentoByUsuario);
 router.get('/compras/:USUARIO_ID', ListCompraAtivosController.ListCompraAtivos);
 router.get('/investimentoByID/:ID', GetInvestimentoByIdController.GetInvestimentoById);
 router.get('/investimentoVenda/:USUARIO_ID', GetInvestimentosVendaByPapelController.GetInvestimentosVendaByPapelController);
 router.post('/regitrarVenda/:USUARIO_ID', RegistarVendaController.RegistrarVenda);
 router.post('/RegistrarInvestimentoByPlanilha/:USUARIO_ID',RegistrarInvestimentoByPlanilha.CreateInvestimentoByList);

 //ROTAS CONTADORES
 router.get('/contadoresByUsuario/:USUARIO_ID', GetContadoresByUsuarioId.Contadores);


 //ROTAS TIPO DE ATIVOS
 router.get('/tipoAtivos', getAllTipoAtivos.getAllTipoAtivos);

module.exports = router;