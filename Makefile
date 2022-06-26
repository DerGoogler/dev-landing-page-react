NODE_BIN = ./node_modules/.bin

dev: 
	${NODE_BIN}/webpack --mode=development

prod: 
	${NODE_BIN}/webpack --mode=production
