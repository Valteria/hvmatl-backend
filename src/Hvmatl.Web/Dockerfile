#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["src/Hvmatl.Web/Hvmatl.Web.csproj", "src/Hvmatl.Web/"]
COPY ["src/Hvmatl.Infrastructure/Hvmatl.Infrastructure.csproj", "src/Hvmatl.Infrastructure/"]
COPY ["src/Hvmatl.Core/Hvmatl.Core.csproj", "src/Hvmatl.Core/"]
RUN dotnet restore "src/Hvmatl.Web/Hvmatl.Web.csproj"
COPY . .
WORKDIR "/src/src/Hvmatl.Web"
RUN dotnet build "Hvmatl.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Hvmatl.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Hvmatl.Web.dll"]