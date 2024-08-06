import { Controller, Get, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Auth()
  @Get('main/:storeId')
  async getMainStatistic(@Param('storeId') storeId: string) {
    return this.statisticService.getMainStatistics(storeId)
  }

  @Auth()
  @Get('middle/:storeId')
  async getMiddleStatistic(@Param('storeId') storeId: string) {
    return this.statisticService.getMiddleStatistics(storeId)
  }
}
