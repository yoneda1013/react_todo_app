import React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const List = (projects) => {
    console.log(projects)
    return(
        <TableContainer>
            <Table>
            <TableHead>
            <TableRow>
                    <TableCell>案件名</TableCell>
                    <TableCell>入稿日</TableCell>
                    <TableCell>詳細ページ</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/* {projects.data.map((row) =>(
                    <TableRow key={row.id}>
                        <TableCell>{row.title}</TableCell>
                    </TableRow> */}
                {/* ))} */}
            </TableBody>
            </Table>
        </TableContainer>
    )


}