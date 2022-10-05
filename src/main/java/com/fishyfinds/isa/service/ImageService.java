package com.fishyfinds.isa.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import javaxt.utils.Base64;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    private static ImageService instance;
    public static ImageService getInstance() {
        if(instance == null) {
            instance = new ImageService();
        }

        return instance;
    }

    public String saveImage(String data, String imageName) throws IOException {
        String imagePath = ".." + File.separator + "upload";

        String base64Image = data.split(",")[1];
        String ext = data.split(",")[0].split("/")[1].split(";")[0];
        if(ext.equals("jpeg")) {
            ext = "jpg";
        }
        imageName += "." +  ext;
        byte[] imageBytes = Base64.decode(base64Image);

        BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
        File file = new File("./src/main/resources/static/upload/" + imageName);
        ImageIO.write(img, ext, file);
        imagePath  += File.separator +  file.getName();
        return imagePath;
    }

    public byte[] getImage(String name){
        BufferedImage bufferedImage = readImage(name);
        String imgStr = "";
        if(bufferedImage != null){
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            try {
                ImageIO.write(bufferedImage, "jpg", bos);
                byte[] imageBytes = bos.toByteArray();
                bos.close();
                return imageBytes;
                //imgStr = Base64.getEncoder().encodeToString(imageBytes);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    private BufferedImage readImage(String name){
        String path = "main" + File.separator +
                      "resources" + File.separator +
                      "static" + File.separator +
                      "upload" + File.separator +
                       name + ".jpg";
        File f = null;
        try {
            f = new File(new File("./src").getCanonicalPath() + File.separator + path);
            if(!f.exists()){
                System.out.println("[ImageService-readImage] - image: " + path  + "does not exist.");
            }else{
                BufferedImage img = null;
                try {
                    img = ImageIO.read(f);
                    return img;
                } catch (IOException e) {

                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }






}
