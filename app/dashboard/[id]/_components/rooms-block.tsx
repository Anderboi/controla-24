import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InfoBlock,
  InfoBlockContent,
  InfoBlockTitle,
} from "@/components/ui/info-block";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Room } from '@/utils/requests';

const RoomsBlock = async ({ rooms }: { rooms: Room[] }) => {
  return (
    <InfoBlock className="h-fit">
      <InfoBlockTitle>Состав помещений</InfoBlockTitle>
      <InfoBlockContent className="p-0">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Номер</TableHead>
              <TableHead>Название</TableHead>
              <TableHead className="w-[150px] text-right">Площадь</TableHead>
              <TableHead className="w-[150px] text-center">
                Теплый пол
              </TableHead>
              <TableHead className="w-[150px] text-center">
                Звукоизоляция
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rooms.map((room: Room) => (
              <TableRow key={room.id}>
                <TableCell role="contentinfo" className="text-right">
                  {room.room_number}
                </TableCell>
                <TableCell className="font-medium">{room.name}</TableCell>
                <TableCell className="text-right">
                  {room.area || 0}
                  {` м.кв.`}
                </TableCell>
                <TableCell role="checkbox">
                  <Checkbox className="size-5" checked={room.hasWarmFloor} />
                </TableCell>
                <TableCell role="checkbox">
                  <Checkbox className="size-5" checked={room.hasIsolation} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfoBlockContent>
    </InfoBlock>
  );
};

export default RoomsBlock;
