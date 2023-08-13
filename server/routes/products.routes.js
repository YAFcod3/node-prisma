import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//get all

router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
  // res.send('productos')
});

//get one
router.get("/products/:id", async (req, res) => {
  const productFound = await prisma.product.findFirst(
    // o findUnique
    {
      where: {
        id: Number(req.params.id),
      },
      include:{category:true}    //relacionarlo con category para q devuelva tamb colu de cat
    }
  );

  if (!productFound) {
    return res.status(404).json("product not found");
  }
  return res.json(productFound);
});

//delete one
router.delete("/products/:id", async (req, res) => {
  const productDeleted = await prisma.product.delete({
    where: { id: parseInt(req.params.id) },
  });

  if (!productDeleted) {
    return res.status(404).json("product not found");
  }
  return res.json(productDeleted);
});

//put one
router.put("/products/:id", async (req, res) => {
  const productUpdated = await prisma.product.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });

  if (!productUpdated) {
    return res.status(404).json("product not found");
  }
  return res.json(productUpdated);
});

//create
router.post("/products", async (req, res) => {
  const newProduct = await prisma.product.create({
    data: req.body,
  });

  res.json(newProduct);
});

export default router;
