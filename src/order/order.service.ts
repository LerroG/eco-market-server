import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { OrderDto } from './dto/order.dto'
import { EnumOrderStatus } from '@prisma/client'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async createPayment(dto: OrderDto, userId: string) {
		const orderItems = dto.items.map(item => ({
			quantity: item.quantity,
			price: item.price,
			product: {
				connect: {
					id: item.productId
				}
			},
			store: {
				connect: {
					id: item.storeId
				}
			}
		}))

		const total = dto.items.reduce((acc, item) => {
			return acc + item.price * item.quantity
		}, 0)

		const order = await this.prisma.order.create({
			data: {
				status: dto.status,
				items: {
					create: orderItems
				},
				total,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})

		return order
	}

	async updateStatus(orderId: string) {
		await this.prisma.order.update({
			where: {
				id: orderId
			},
			data: {
				status: EnumOrderStatus.PAYED
			}
		})

		return true
	}
}
