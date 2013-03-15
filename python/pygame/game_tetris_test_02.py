import pygame, sys, random
from pygame.locals import *


class Object:
	def __init__(self, screen):
		self.screen = screen
		self.types = ("square", "L", "I")
		self.type = self.types[0]
		self.color = ()
		self.x = 1
		self.y = 1
		self.w = 10
		self.h = 10
		self.count_posY = 0
		self.count_posX = 0
		self.grid_pos = []
		self.spd_y = self.h
		self.spd_x = self.w
		self.moveH = True


	def createSquare(self, screen, color):
		self.grid_pos = []

		sqr = []
		sqr.append(pygame.draw.rect(self.screen, color,(self.x, self.y, self.w, self.h)) )
		sqr.append(pygame.draw.rect(self.screen, color,(self.x+1+self.w, self.y, self.w, self.h)) )
		sqr.append(pygame.draw.rect(self.screen, color,(self.x, self.y+1+self.h, self.w, self.h)) )
		sqr.append(pygame.draw.rect(self.screen, color,(self.x+1+self.w, self.y+1+self.h, self.w, self.h)) )

		self.grid_pos.append([self.x, self.y])
		self.grid_pos.append([self.x+1+self.w, self.y])
		self.grid_pos.append([self.x, self.y+1+self.h])
		self.grid_pos.append([self.x+1+self.w, self.y+1+self.h])

		return sqr


	def checkCollid(self, pos):
		pass


	def create(self, screen, color):
		return self.createSquare(self.screen, color)


	def move(self, grid):
		# Square
		if self.type == self.types[0]: 
			# Altera a posicao Y do objeto
			self.y = grid.grid[1][self.count_posY]

			#verifica de atingil o limite do ultimo indice do array
			if self.count_posY < len(grid.grid[1])-2:
				#incrementa a variavel de controle
				self.count_posY +=1
			else:
				self.moveH = False

		


	def move_h(self, grid, direction):
		# Square
		if self.type == self.types[0]:
			if self.moveH:
				if direction == "R":
					if self.count_posX <= len(grid.grid[0])-3:
						self.count_posX +=1

				elif direction == "L":
					if self.count_posX >= 1:
						self.count_posX -=1
			
				self.x = grid.grid[0][self.count_posX]


""" ######################################################### """

class Grid():
	def __init__(self):
		self.x = 1
		self.y = 1
		self.w = 10
		self.h = 10
		self.gridX = 19
		self.gridY = 28
		self.grid = [[0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,1,2,3,4,5,6,7,8,9,10,11,12]]
		self.bloksLocked = []

	def create(self, screen):
		countX = 0
		countY = 0
		for x in range(0,self.gridY):			
			if countX < self.gridX:
				self.grid[0][countX] = self.x
				countX += 1
				self.x += self.w+1
				if self.x > (self.w+1) * self.gridX:
					self.x = 1

			if countY <self.gridY:
				self.grid[1][countY] = self.y
				countY += 1
				self.y += self.h+1
				if self.y > (self.h+1) * self.gridY:
					self.y = 1
		
		for x in range(0,self.gridX):
			for y in range(0,self.gridY):
				pygame.draw.rect(screen, (30,30,30),(self.grid[0][x], self.grid[1][y], self.w, self.h))
		return self.grid


	def setbloksLocked(self,pos):
		self.bloksLocked[0] = []


""" ######################################################### """


class Game:
	def __init__(self,  title, size):
		self.title = title
		self.size = size
		self.screen = None
		self.level = 1
		self.spd = 0.5
		self.score = 0


	def sideBar(self, size):
		sideBar = pygame.Surface(size)
		sideBar.fill((200,200,200))
		self.screen.blit(sideBar,(self.screen.get_width()-size[0], 0))


	def createApp(self):
		pygame.init()
		pygame.display.set_caption(self.title)
		self.screen = pygame.display.set_mode((self.size))

		#colors
		WHITE = (255,255,255)
		BLACK = (0,0,0)
		RED = (255,0,0)
		GREEN = (0,255,0)
		BLUE = (0,0,255)

		#FPS
		fps_rate = 24
		fps = pygame.time.Clock()

		#Timer
		tm = 0

		#Game Control
		endLoop = False

		# Create a new object
		obj = Object(self.screen)

		#create the grid
		grid = Grid()

		obj = Object(self.screen)

		#Variavel de controle para contar os indices do array de grid
		count_pos = 0
		count_pos_x = 0

		while not endLoop:
			fps.tick(fps_rate)
			self.screen.fill(BLACK)

			#create the grind at screen
			grid.create(self.screen)

			#create the block object art screen
			obj.create(self.screen,(255,0,0))	

			#Print the sideBar
			self.sideBar((100, self.screen.get_height()))

			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					endLoop = True

				if event.type == pygame.KEYDOWN:
					#move to the right
					if event.key == pygame.K_RIGHT:
						obj.move_h(grid, "R")

					#move to the left
					if event.key == pygame.K_LEFT:
						obj.move_h(grid,"L")
			
			
			
			#calcula o tempo de "delay" para mover o objeto
			tm +=1
			if tm >= fps_rate * self.spd:
				# Altera a posicao Y do objeto
				print obj.grid_pos

				obj.move(grid)
				tm = 0

			
			pygame.display.flip()

		if endLoop:
			pygame.quit()




game = Game("Test Tetris", (320,320))
game.createApp()
