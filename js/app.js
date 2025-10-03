// DATOS DEL SISTEMA
var usuarios = [
    {usuario: "admin1", password: "admin123", rol: "admin", nombre: "Carlos Pérez"},
    {usuario: "admin2", password: "admin456", rol: "admin", nombre: "María López"},
    {usuario: "tecnico1", password: "tec123", rol: "tecnico", nombre: "Juan Torres"},
    {usuario: "tecnico2", password: "tec456", rol: "tecnico", nombre: "Ana Gómez"},
    {usuario: "tecnico3", password: "tec789", rol: "tecnico", nombre: "Luis Martínez"}
];

var inventario = [
    {id: "EQ001", equipo: "Dell Optiplex 7090", procesador: "Intel i7", ram: "16GB", disco: "512GB SSD", ubicacion: "Sala A1", estado: "Operativo"},
    {id: "EQ002", equipo: "HP ProDesk 400", procesador: "Intel i5", ram: "8GB", disco: "256GB SSD", ubicacion: "Sala B2", estado: "Mantenimiento"},
    {id: "EQ003", equipo: "Lenovo ThinkCentre", procesador: "Intel i7", ram: "16GB", disco: "1TB HDD", ubicacion: "Lab 1", estado: "Operativo"},
    {id: "EQ004", equipo: "Dell Latitude 5520", procesador: "Intel i5", ram: "8GB", disco: "256GB SSD", ubicacion: "Admin", estado: "Operativo"},
    {id: "EQ005", equipo: "Asus VivoBook", procesador: "AMD Ryzen 5", ram: "12GB", disco: "512GB SSD", ubicacion: "Sala C3", estado: "Dañado"}
];

var mantenimientos = [
    {id: 1, equipo: "Dell Optiplex 7090", fecha: "2025-01-15", tipo: "Preventivo", tecnico: "Juan Torres", costo: "$50.000", estado: "Completado"},
    {id: 2, equipo: "HP ProDesk 400", fecha: "2025-02-20", tipo: "Correctivo", tecnico: "Ana Gómez", costo: "$120.000", estado: "En proceso"},
    {id: 3, equipo: "Lenovo ThinkCentre", fecha: "2025-03-10", tipo: "Preventivo", tecnico: "Luis Martínez", costo: "$45.000", estado: "Completado"},
    {id: 4, equipo: "Dell Latitude 5520", fecha: "2025-04-05", tipo: "Actualización", tecnico: "Juan Torres", costo: "$80.000", estado: "Completado"},
    {id: 5, equipo: "Asus VivoBook", fecha: "2025-05-12", tipo: "Correctivo", tecnico: "Ana Gómez", costo: "$200.000", estado: "Pendiente"}
];

var reportes = [
    {mes: "Enero", mantenimientos: 12, preventivos: 8, correctivos: 4, costoTotal: "$850.000"},
    {mes: "Febrero", mantenimientos: 15, preventivos: 10, correctivos: 5, costoTotal: "$1.200.000"},
    {mes: "Marzo", mantenimientos: 10, preventivos: 7, correctivos: 3, costoTotal: "$720.000"},
    {mes: "Abril", mantenimientos: 18, preventivos: 12, correctivos: 6, costoTotal: "$1.500.000"},
    {mes: "Mayo", mantenimientos: 14, preventivos: 9, correctivos: 5, costoTotal: "$1.100.000"}
];

var equiposTecnico = [
    {id: "EQ001", equipo: "Dell Optiplex 7090", ubicacion: "Sala A1", ultimoMant: "2025-01-15", proximoMant: "2025-07-15"},
    {id: "EQ002", equipo: "HP ProDesk 400", ubicacion: "Sala B2", ultimoMant: "2025-02-20", proximoMant: "2025-08-20"},
    {id: "EQ006", equipo: "Acer Aspire", ubicacion: "Lab 2", ultimoMant: "2025-03-01", proximoMant: "2025-09-01"},
    {id: "EQ007", equipo: "MSI Modern", ubicacion: "Biblioteca", ultimoMant: "2025-04-10", proximoMant: "2025-10-10"}
];

// Variable global para usuario actual
var usuarioActual = null;

// INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', function() {
    // Event listener para el botón de login
    document.getElementById('btnIngresar').addEventListener('click', validarLogin);
    
    // Event listener para el enter en el formulario de login
    document.getElementById('loginForm').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            validarLogin();
        }
    });
});

// FUNCIÓN DE LOGIN
var validarLogin = function() {
    var user = document.getElementById("usuario").value;
    var pass = document.getElementById("password").value;
    var rol = document.getElementById("rol").value;
    var error = document.getElementById("errorLogin");
    
    if(user === "" || pass === "" || rol === "") {
        error.textContent = "⚠️ Todos los campos son obligatorios";
        error.style.display = "block";
        return false;
    }
    
    var encontrado = false;
    for(var i = 0; i < usuarios.length; i++) {
        if(usuarios[i].usuario === user && usuarios[i].password === pass && usuarios[i].rol === rol) {
            encontrado = true;
            usuarioActual = usuarios[i];
            break;
        }
    }
    
    if(encontrado) {
        error.style.display = "none";
        document.getElementById("paginaLogin").style.display = "none";
        document.getElementById("menuHorizontal").style.display = "block";
        document.getElementById("nombreUsuario").textContent = usuarioActual.nombre + " (" + usuarioActual.rol + ")";
        
        if(usuarioActual.rol === "admin") {
            cargarMenuAdmin();
            mostrarPagina("adminDashboard");
        } else if(usuarioActual.rol === "tecnico") {
            cargarMenuTecnico();
            mostrarPagina("tecnicoDashboard");
        }
    } else {
        error.textContent = "❌ Usuario, contraseña o rol incorrectos";
        error.style.display = "block";
    }
};

var cargarMenuAdmin = function() {
    var menu = document.getElementById("menuItems");
    menu.innerHTML = `
        <li><a href="#" id="menuAdminDashboard">Dashboard</a></li>
        <li><a href="#" id="menuAdminInventario">Inventario</a></li>
        <li><a href="#" id="menuAdminReportes">Reportes</a></li>
        <li><a href="#" id="menuAdminUsuarios">Usuarios</a></li>
        <li><a href="#" id="menuSalir">Salir</a></li>
    `;
    
    // Agregar event listeners
    document.getElementById('menuAdminDashboard').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarPagina('adminDashboard');
    });
    document.getElementById('menuAdminInventario').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarPagina('adminInventario');
    });
    document.getElementById('menuAdminReportes').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarPagina('adminReportes');
    });
    document.getElementById('menuAdminUsuarios').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarPagina('adminUsuarios');
    });
    document.getElementById('menuSalir').addEventListener('click', function(e) {
        e.preventDefault();
        cerrarSesion();
    });
};

var cargarMenuTecnico = function() {
    var menu = document.getElementById("menuItems");
    menu.innerHTML = `
        <li><a href="#" id="menuTecnicoDashboard">Dashboard</a></li>
        <li><a href="#" id="menuTecnicoMantenimiento">Mantenimientos</a></li>
        <li><a href="#" id="menuTecnicoEquipos">Equipos</a></li>
        <li><a href="#" id="menuTecnicoReporte">Crear Reporte</a></li>
        <li><a href="#" id="menuTecnicoSalir">Salir</a></li>
    `;
    
    // Agregar event listeners
    document.getElementById('menuTecnicoDashboard').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarPagina('tecnicoDashboard');
    });
    document.getElementById('menuTecnicoMantenimiento').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarPagina('tecnicoMantenimiento');
    });
    document.getElementById('menuTecnicoEquipos').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarPagina('tecnicoEquipos');
    });
    document.getElementById('menuTecnicoReporte').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarPagina('tecnicoReporte');
    });
    document.getElementById('menuTecnicoSalir').addEventListener('click', function(e) {
        e.preventDefault();
        cerrarSesion();
    });
};

var mostrarPagina = function(idPagina) {
    var paginas = document.getElementsByClassName("pagina");
    for(var i = 0; i < paginas.length; i++) {
        paginas[i].style.display = "none";
    }
    
    document.getElementById(idPagina).style.display = "block";
    
    // Cargar datos según la página
    if(idPagina === "adminInventario") {
        cargarTablaInventario();
    } else if(idPagina === "adminReportes") {
        cargarTablaReportes();
    } else if(idPagina === "tecnicoMantenimiento") {
        cargarTablaMantenimientos();
    } else if(idPagina === "tecnicoEquipos") {
        cargarTablaEquipos();
    } else if(idPagina === "adminDashboard") {
        // Agregar event listener para el botón de info admin
        var btnInfoAdmin = document.getElementById('btnInfoAdmin');
        if(btnInfoAdmin) {
            btnInfoAdmin.onclick = function() { toggleContenido('infoAdmin'); };
        }
    } else if(idPagina === "tecnicoDashboard") {
        // Agregar event listener para el botón de info técnico
        var btnInfoTecnico = document.getElementById('btnInfoTecnico');
        if(btnInfoTecnico) {
            btnInfoTecnico.onclick = function() { toggleContenido('infoTecnico'); };
        }
    } else if(idPagina === "adminUsuarios") {
        // Agregar event listener para el botón de registrar usuario
        var btnRegistrar = document.getElementById('btnRegistrar');
        if(btnRegistrar) {
            btnRegistrar.onclick = registrarUsuario;
        }
    } else if(idPagina === "tecnicoReporte") {
        // Agregar event listener para el botón de enviar reporte
        var btnEnviarReporte = document.getElementById('btnEnviarReporte');
        if(btnEnviarReporte) {
            btnEnviarReporte.onclick = enviarReporte;
        }
    }
};

var toggleContenido = function(idElemento) {
    var elemento = document.getElementById(idElemento);
    if(elemento.style.display === "none") {
        elemento.style.display = "block";
    } else {
        elemento.style.display = "none";
    }
};

var cargarTablaInventario = function() {
    var html = "<tr><th>ID</th><th>Equipo</th><th>Procesador</th><th>RAM</th><th>Disco</th><th>Ubicación</th><th>Estado</th></tr>";
    for(var i = 0; i < inventario.length; i++) {
        html += "<tr>";
        html += "<td>" + inventario[i].id + "</td>";
        html += "<td>" + inventario[i].equipo + "</td>";
        html += "<td>" + inventario[i].procesador + "</td>";
        html += "<td>" + inventario[i].ram + "</td>";
        html += "<td>" + inventario[i].disco + "</td>";
        html += "<td>" + inventario[i].ubicacion + "</td>";
        html += "<td>" + inventario[i].estado + "</td>";
        html += "</tr>";
    }
    document.getElementById("tablaInventario").innerHTML = html;
};

var cargarTablaReportes = function() {
    var html = "<tr><th>Mes</th><th>Mantenimientos</th><th>Preventivos</th><th>Correctivos</th><th>Costo Total</th></tr>";
    for(var i = 0; i < reportes.length; i++) {
        html += "<tr>";
        html += "<td>" + reportes[i].mes + "</td>";
        html += "<td>" + reportes[i].mantenimientos + "</td>";
        html += "<td>" + reportes[i].preventivos + "</td>";
        html += "<td>" + reportes[i].correctivos + "</td>";
        html += "<td>" + reportes[i].costoTotal + "</td>";
        html += "</tr>";
    }
    document.getElementById("tablaReportes").innerHTML = html;
};

var cargarTablaMantenimientos = function() {
    var html = "<tr><th>ID</th><th>Equipo</th><th>Fecha</th><th>Tipo</th><th>Técnico</th><th>Costo</th><th>Estado</th></tr>";
    for(var i = 0; i < mantenimientos.length; i++) {
        html += "<tr>";
        html += "<td>" + mantenimientos[i].id + "</td>";
        html += "<td>" + mantenimientos[i].equipo + "</td>";
        html += "<td>" + mantenimientos[i].fecha + "</td>";
        html += "<td>" + mantenimientos[i].tipo + "</td>";
        html += "<td>" + mantenimientos[i].tecnico + "</td>";
        html += "<td>" + mantenimientos[i].costo + "</td>";
        html += "<td>" + mantenimientos[i].estado + "</td>";
        html += "</tr>";
    }
    document.getElementById("tablaMantenimientos").innerHTML = html;
};

var cargarTablaEquipos = function() {
    var html = "<tr><th>ID</th><th>Equipo</th><th>Ubicación</th><th>Último Mant.</th><th>Próximo Mant.</th></tr>";
    for(var i = 0; i < equiposTecnico.length; i++) {
        html += "<tr>";
        html += "<td>" + equiposTecnico[i].id + "</td>";
        html += "<td>" + equiposTecnico[i].equipo + "</td>";
        html += "<td>" + equiposTecnico[i].ubicacion + "</td>";
        html += "<td>" + equiposTecnico[i].ultimoMant + "</td>";
        html += "<td>" + equiposTecnico[i].proximoMant + "</td>";
        html += "</tr>";
    }
    document.getElementById("tablaEquipos").innerHTML = html;
};

var registrarUsuario = function() {
    var nombre = document.getElementById("nombreUser").value;
    var edad = document.getElementById("edadUser").value;
    var genero = document.querySelector('input[name="genero"]:checked');
    var dept = document.getElementById("deptUser").value;
    var resultado = document.getElementById("resultadoUsuario");
    
    if(nombre === "" || edad === "" || !genero) {
        resultado.style.background = "#f8d7da";
        resultado.style.color = "#721c24";
        resultado.innerHTML = "⚠️ Complete todos los campos";
        resultado.style.display = "block";
        return;
    }
    
    resultado.style.background = "#d4edda";
    resultado.style.color = "#155724";
    resultado.innerHTML = "✅ Usuario registrado correctamente:<br><strong>Nombre:</strong> " + nombre + "<br><strong>Edad:</strong> " + edad + "<br><strong>Género:</strong> " + genero.value + "<br><strong>Departamento:</strong> " + dept;
    resultado.style.display = "block";
    
    document.getElementById("formUsuario").reset();
};

var enviarReporte = function() {
    var equipo = document.getElementById("equipoRep").value;
    var tipo = document.getElementById("tipoServicio").value;
    var prioridad = document.querySelector('input[name="prioridad"]:checked');
    var tiempo = document.getElementById("tiempoEst").value;
    var resultado = document.getElementById("resultadoReporte");
    
    if(equipo === "" || tiempo === "" || !prioridad) {
        resultado.style.background = "#f8d7da";
        resultado.style.color = "#721c24";
        resultado.innerHTML = "⚠️ Complete todos los campos del reporte";
        resultado.style.display = "block";
        return;
    }
    
    resultado.style.background = "#d4edda";
    resultado.style.color = "#155724";
    resultado.innerHTML = "✅ Reporte enviado correctamente:<br><strong>Equipo:</strong> " + equipo + "<br><strong>Tipo:</strong> " + tipo + "<br><strong>Prioridad:</strong> " + prioridad.value + "<br><strong>Tiempo estimado:</strong> " + tiempo + " horas";
    resultado.style.display = "block";
    
    document.getElementById("formReporte").reset();
};

var cerrarSesion = function() {
    usuarioActual = null;
    document.getElementById("paginaLogin").style.display = "block";
    document.getElementById("menuHorizontal").style.display = "none";
    
    var paginas = document.getElementsByClassName("pagina");
    for(var i = 0; i < paginas.length; i++) {
        paginas[i].style.display = "none";
    }
    
    document.getElementById("loginForm").reset();
    document.getElementById("errorLogin").style.display = "none";
};