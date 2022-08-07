import {NextApiRequest, NextApiResponse} from "next";
import { PrismaClient } from "@prisma/client"
import {IGame} from "../../types/Game.types";


const prisma = new PrismaClient()

export default async function addGame(req: NextApiRequest, res: NextApiResponse) {
    const game = JSON.parse(req.body.data)
    // TODO: Need to incorporate the relationship between the user and the game

    prisma.game.create({
        data: {
            event: '?',
            site: 'https://lichess.org/HqGm7a3b',
            date: '????.??.??',
            round: "0",
            white: '?',
            black: '?',
            result: '0-1',
            whiteElo: 0,
            blackElo: 0,
            timeControl: '-',
            eco: 'A00',
            termination: 'Unknown',
            moves: [
                'e3',   'c5',   'Qh5',  'd6',   'Bc4',   'e6',   'Nc3',
                'Nf6',  'Qf3',  'a6',   'Nge2', 'd5',    'Nxd5', 'exd5',
                'Bb3',  'c4',   'Ba4+', 'b5',   'Bxb5+', 'axb5', 'Qf4',
                'Nc6',  'Nd4',  'Nxd4', 'Qe5+', 'Ne6',   'O-O',  'Qd6',
                'd4',   'Qxe5', 'dxe5', 'Nd7',  'Rd1',   'Bb7',  'f4',
                'Bc5',  'b4',   'Bxb4', 'Rb1',  'Bc5',   'Rxb5', 'O-O-O',
                'Rxb7', 'Kxb7', 'Kf1',  'Nb6',  'f5',    'Ng5',  'e6',
                'fxe6', 'h4',   'Ne4',  'fxe6', 'Rhe8',  'Bb2',  'g6',
                'Bd4',  'Bxd4', 'Rxd4', 'Rxe6', 'Kg1',   'Kc6',  'h5',
                'Nc3',  'hxg6', 'Ne2+', 'Kf1',  'Nxd4',  'gxh7', 'Rh6',
                'exd4', 'Rxh7', 'Ke2',  'Re7+', 'Kf3',   'Re4',  'Kg3',
                'Rf8',  'c3',   'Na4',  'Kh2',  'Nxc3',  'g3',   'Nd1',
                'Kh1',  'Ne3',  'Kh2',  'Nf5',  'Kg1',   'Nxg3', 'Kh2',
                'Nh1',  'Kxh1', 'Rg4',  'Kh2',  'Rh8#'
            ],
            otherTags: [
                { name: 'variant', value: 'Standard' },
                { name: 'opening', value: "Van't Kruijs Opening" }
            ]
        }

    })

    return res.status(200).json("game added")
}