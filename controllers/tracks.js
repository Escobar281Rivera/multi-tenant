const {tracksModel} = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require ("express-validator");

//Methods CRUD
//GET ALLS
const getItems = async(req, res) => {
    try {  
        const user = req.user; 
        const data = await tracksModel.findAllData({});
        res.send({data, user});
    } catch (e) {
        handleHttpError(res, 'EROR_GET_ITEMS');  
    }
};

//GET DETAIL
const getItem = async(req, res) => {
   try {
    req = matchedData(req);
    const {id}= req;
    const data = await tracksModel.findOneData(id);
    res.send({data});
   } catch (e) {
    handleHttpError(res,'ERROR_GET_ITEM')
    
   }
};

//CREATE
const createItem = async(req, res) => {

    try {  
        // const body = matchedData(req)   
        // const data = await tracksModel.create({
        //     name: body.name,
        //     album: body.album,
        //     cover: body.cover,
        //     artist_name : body.artist.name,
        //     artist_nickname: body.artist.nickname,
        //     artist_nationality: body.artist.nationality,
        //     duration_start: body.duration.start,
        //     duration_end: body.duration.end,
        //     mediaId: body.mediaId,
        // });
        const {body} = req
        console.log(body)
        const data = await tracksModel.create(body)
        res.send({data});
        //-------

    } catch (e) {
        handleHttpError(res, 'EROR_CREATE_ITEMS');  
    }
    
};

//UPDATE
const updateItem = async(req, res) =>{
    try {  
        const {id, ...body} = matchedData (req); 
        const data = await  tracksModel.findOneAndUpdate(
            id, body
        );
        res.send({data});
    } catch (e) {
        handleHttpError(res, 'EROR_UPDATE_ITEM');  
    }
};

//DELETE
const deleteItem = async(req, res) =>{
    try {
        req = matchedData(req);
        const {id}= req;
        const data = await tracksModel.delete({_id:id});
        res.send({data});
       } catch (e) {
        console.log(e)
        handleHttpError(res,'ERROR_DELETE_ITEM')
        
        }
};

module.exports ={getItem,getItems, createItem,updateItem,deleteItem};