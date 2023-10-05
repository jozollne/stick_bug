import { PartialType } from '@nestjs/mapped-types';
import { CreateStickBugDto } from './create-stick_bug.dto';

export class UpdateStickBugDto extends PartialType(CreateStickBugDto) {
  id: number;
}
