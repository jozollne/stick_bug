import { Injectable } from '@nestjs/common';
import { CreateStickBugDto } from './dto/create-stick_bug.dto';
import { UpdateStickBugDto } from './dto/update-stick_bug.dto';

@Injectable()
export class StickBugService {
  create(createStickBugDto: CreateStickBugDto) {
    return 'This action adds a new stickBug';
  }

  findAll() {
    return `This action returns all stickBug`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stickBug`;
  }

  update(id: number, updateStickBugDto: UpdateStickBugDto) {
    return `This action updates a #${id} stickBug`;
  }

  remove(id: number) {
    return `This action removes a #${id} stickBug`;
  }
}
