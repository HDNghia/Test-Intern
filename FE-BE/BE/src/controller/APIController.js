import pool from '../configs/connectDB';
let getAlljoke = async (req, res) => {
    console.log("check param: ", req.query.id)
    let jokeId = req.query.id;
    if (jokeId == null) {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM jokes');
            return res.status(200).json({
                message: 'ok',
                data: rows
            })
        } catch (error) {
            return res.status(404).json({
                message: error
            })
        }
    } else {
        try {
            const [detail, fields] = await pool.execute('SELECT * FROM jokes where id = ?', [jokeId]);
            return res.status(200).json({
                message: 'ok',
                data: detail
            })
        } catch (error) {
            return res.status(404).json({
                message: error
            })
        }
    }

}
let UpdateVoteStory = async (req, res) => {
    let jokeId = req.query.id;
    console.log("check id: ", jokeId)
    console.log("check res: ", req.body);
    let { vote } = req.body;
    console.log(vote)
    if (!vote) {
        return res.status(200).json({
            message: 'missing requied params'
        })
    }
    try {
        await pool.execute('update jokes set vote = ? where id = ?',
            [vote, jokeId]);
        const [rows, fields] = await pool.execute('SELECT * FROM jokes');
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


module.exports = {
    getAlljoke, UpdateVoteStory
}