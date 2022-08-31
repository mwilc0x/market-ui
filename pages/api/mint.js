import fs from 'fs';
import md5 from 'md5';

export default function handler(req, res) {
    try {
        const { data, name } = req.body;
        
        let buff = Buffer.from(data, 'base64');
        const hash = md5(`${Date.now()}${name}`);
        const fileType = name.split('.')[1];
        const file = `${hash}.${fileType}`;
        fs.writeFileSync(`./nft/${file}`, buff);
        res.status(200).json({ message: 'NFT image saved.', file: file });
    } catch (e) {
        console.log('error', e);
    }
}