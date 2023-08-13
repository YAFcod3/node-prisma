import {Router} from "express";
import { PrismaClient } from '@prisma/client'


const router =Router()
const prisma =new PrismaClient()


router.get('/categories',async(req,res)=>{

const categories=await prisma.category.findMany({
  include:{products:true}
})
res.json(categories)

  // res.send('categoria')
})



export default router
