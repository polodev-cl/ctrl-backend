FROM public.ecr.aws/lambda/nodejs:20 as builder
WORKDIR /usr/app
COPY package.json ./
COPY src src/
COPY tsconfig.json tsconfig.build.json ./
RUN npm install 
RUN npm run build


FROM public.ecr.aws/lambda/nodejs:20
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/ ./dist
COPY --from=builder /usr/app/node_modules/ ./node_modules
CMD ["dist/index.handler"]
