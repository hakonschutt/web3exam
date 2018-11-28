FROM microsoft/dotnet:2.1-sdk

COPY pub/ /root/

WORKDIR /root/

ENV ASPNETCORE_URLS="http://*:5000"

EXPOSE 5000/tcp

ENTRYPOINT ["dotnet", "PoliceCase.dll"]

FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app

FROM microsoft/aspnetcore-build:2.0 AS builder
WORKDIR /src
COPY *.sln ./
COPY ./CarApi.csproj CarApi/
RUN dotnet restore
COPY . .
WORKDIR /src/CarApi
RUN dotnet build -c Release -o /app

FROM builder AS publish
RUN dotnet publish -c  Release -o /app

FROM base AS production
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "PoliceCase.dll"]