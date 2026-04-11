url = "https://docs.google.com/spreadsheets/d/18TCreWyBAcTPjhSPT57d43RAZ2UHDSL5SCSP6gixXVE/edit?usp=sharing"

async def get_csv_data():
    import aiohttp
    import csv
    import io

    # Convertir la URL de Google Sheets a una URL de exportación CSV
    csv_url = url.replace("/edit?usp=sharing", "/export?format=csv")

    async with aiohttp.ClientSession() as session:
        async with session.get(csv_url) as response:
            if response.status == 200:
                csv_content = await response.text()
                csv_reader = csv.DictReader(io.StringIO(csv_content))
                data = [row for row in csv_reader]
                return data
            else:
                raise Exception(f"Error al obtener el CSV: {response.status}")