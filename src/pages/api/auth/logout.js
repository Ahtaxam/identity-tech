import { deleteCookie } from "cookies-next";


export default async function handler(req, res) {
    if (req.method === 'POST') {
      deleteCookie('authCookie', { res, req });      
      
      return res.status(200).json({ message: 'Logout successful' });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  }
  