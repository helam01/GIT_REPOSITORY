import pygame, sys, random
from pygame.locals import *

class Player():
	def __init__(self, parent, color):
		self.parent = parent
		self.player = None
		self.x = 50
		self.y = 50
		self.w = 20
		self.h = 20
		self.color = color
		self.spd_x = 5
		self.spd_y = 5

	def create(self, target, position):
		self.player = pygame.draw.rect(target, self.color, 	(self.x, self.y, self.w, self.h))
		return self.player

	def move(self, move, direction):
		if move:
			if self.x <= 0:
				return "Collid x-"
			elif self.x >= self.parent.get_width() - self.w:
				return "Collid x+"
			elif self.y >= self.parent.get_height() - self.h:
				return "Collid y+"
			elif self.y <= 30:
				return "Collid y-"
			else: 
				if direction == "R":
					self.x += self.spd_x
				elif direction == "L":
					self.x -= self.spd_x
				elif direction == "U":
					self.y -= self.spd_y
				elif direction == "D":
					self.y += self.spd_y
				else:
					return False

				return True
		else:
			return False


""" ################################################################################### """


class PointObj():
	def __init__(self, parent):
		self.parent = parent
		self.obj = None
		self.x = random.randrange(0,self.parent.get_width() - 20)
		self.y = random.randrange(30,self.parent.get_height() - 20)
		self.w = 20
		self.h = 20
		#print self.x

	def create(self, target):
		self.obj = pygame.draw.rect(target, (255,0,0), (self.x, self.y, self.w, self.h))
		return self.obj

	def checkCollidion(self, position):
		#Check X position
		cx = False
		cy = False
		for x1 in range(position[0][0], position[0][0]+position[0][1]):
			for x2 in range(self.x, self.x+self.w): 
				if x1 == x2:
					cx = True

		#Check Y position
		for y1 in range(position[1][0], position[1][0]+position[1][1]):
			for y2 in range(self.y, self.y+self.h): 
				if y1 == y2:
					cy = True

		if cx and cy:
			return True
		else:	
			return False

	def destroy(self):
		try:
			del self
			return True
		except Exception, e:
			print e
	

""" ################################################################################### """


class Button:
	def __init__(self, screen, name, _type, image):
		self.screen = screen
		self.name = name
		self.type = _type
		self.image = image
		self.x = 0
		self.y = 20
		self.w = 0
		self.h = 0
		self.startBtn = None

	def create(self):
		self.startBtn = pygame.sprite.Sprite()
		self.startBtn.image = pygame.image.load(self.image)
		self.startBtn.rect = self.startBtn.image.get_rect()
		
		self.startBtn.rect.topleft = [self.screen.get_width()/2-self.startBtn.rect[2]/2, 50]
		self.screen.blit(self.startBtn.image, self.startBtn.rect)

		self.x = self.startBtn.rect[0]
		self.y = self.startBtn.rect[1]
		self.w = self.startBtn.rect[2]
		self.h = self.startBtn.rect[3]


	def checkClick(self, pos):
		#Check X position
		cx = False
		cy = False
		for x1 in range(self.x, self.x+self.w):
			
			if x1 == pos[0]:
				cx = True
				break

		#Check Y position
		for y1 in range(self.y, self.y+self.h):
			if y1 == pos[1]:
				cy = True
				break

		if cx and cy:
			return True
		else:	
			return False		


""" ################################################################################### """

class App:
	def __init__(self, title, size):
		self.title = title
		self.size = size
		self.score = 0
		self.level = 1


	def startScreen(self, screen):
		startScreen_bg = pygame.Surface((150,150))
		startScreen_bg.fill((150, 150, 150))
		screen.blit(startScreen_bg, (25,25))

		titleFont = pygame.font.Font(None, 30)
		titleText = titleFont.render("Take it - v0.1", 1, (0,0,0))
		screen.blit(titleText, (25,0))


	def scoreBar(self, screen):
		score_background = pygame.Surface((screen.get_width(), 30))
		score_background.fill((200,200,200))
		screen.blit(score_background, (0,0))
		
		font = pygame.font.Font(None, 20)
		text = font.render("Score: %i   - Level: %i" %(self.score, self.level), 1, (0,0,0))
		screen.blit(text, (0,0))


	def countScore(self, player):
		self.score += 1
		if self.score % 5 == 0:
			self.level += 1
			player.spd_y += 5
			player.spd_x += 5


	def gameOver(self, screen):
		background = pygame.Surface(screen.get_size())
		background = background.convert()
		background.fill((100,100,250))

		font = pygame.font.Font(None, 45)
		text = font.render("GAME OVER",1,(0,0,0))

		screen.blit(text, (10,100))


	def createScreen(self):
		pygame.init()

		screen = pygame.display.set_mode(self.size)
		pygame.display.set_caption(self.title)

		#colors
		WHITE = (255,255,255)
		BLACK = (0,0,0)
		RED = (255,0,0)
		GREEN = (0,255,0)
		BLUE = (0,0,255)

		#FPS
		fps = pygame.time.Clock()

		#Loop Control
		loopC = False
		gameOver = False
		start_screen = True
		start_game = False

		#Create a Player Object
		player = Player(screen, GREEN)
		p_x = 10
		p_y = 10
		move = None
		direction = ""

		#create a PointObj Object
		pointObj = PointObj(screen)
		

		#Main Loop
		while loopC == False:
			screen.fill(WHITE)
			fps.tick(12)	

			if start_screen:
				self.startScreen(screen)
				startBtn = Button(screen, "start", "start", "start_btn.png")
				startBtn.create()
			

			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					loopC = True

				#Get the mouse button press
				if event.type == pygame.MOUSEBUTTONDOWN:
					if pygame.mouse.get_pressed()[0] == 1:
						if startBtn.checkClick(pygame.mouse.get_pos()):
							start_screen = False
							start_game = True


				# Get the pressed Key to set the player direction
				if event.type == pygame.KEYDOWN:
					if event.key == pygame.K_RIGHT:
						direction = "R"
					elif event.key == pygame.K_LEFT:
						direction = "L"
					elif event.key == pygame.K_UP:
						direction = "U"
					elif event.key == pygame.K_DOWN:
						direction = "D"
			
					

			if start_game:
				#Print Scorebar
				self.scoreBar(screen)

				#Check if the direction was set by key press
				if direction == "R" or direction == "L" or direction == "U" or direction == "D":
					move =  player.move(True, direction)

				
				##Check if is gameover
				if gameOver:
					pygame.time.wait(2000)
					print "Delay"
					self.score = 0
					self.level = 1
					self.createScreen()
					

				# check if player has collide
				if move == "Collid x+" or move == "Collid x-" or move == "Collid y+" or move == "Collid y-":
					gameOver = True
					self.gameOver(screen)
				
				collid = pointObj.checkCollidion(((player.x,player.w), (player.y,player.h)))
				
				if collid:
					pointObj.destroy()
					pointObj = PointObj(screen)				
					self.countScore(player)					
				else:
					pointObj.create(screen)

				# Print the player at the screen				
				player.create(screen, (p_x,p_y))

			pygame.display.flip()
		

		if loopC == True:
			pygame.quit()


game = App("First Game", (200,200))
game.createScreen()