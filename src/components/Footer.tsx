import React from "react";
import { Box, Typography, TextField, Button, IconButton, Container, Grid } from "@mui/material";
import { Email, Instagram, LinkedIn, Twitter, YouTube, RssFeed } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#fff", color: "#000", py: 6, borderTop: "1px solid #ddd" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#FFCE04",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>☕</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                the news
              </Typography>
            </Box>
            <Typography sx={{ mt: 1, fontSize: "14px", maxWidth: 200 }}>
              tudo que você precisa saber pra começar seu dia bem e informado
            </Typography>
            <Typography sx={{ mt: 2, fontSize: "12px", color: "gray" }}>© 2025 Grupo Waffle.</Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Início
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, cursor: "pointer" }}>
              Posts
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, cursor: "pointer" }}>
              Newsletters
            </Typography>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Fale conosco
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" sx={{ border: "2px solid #FFCE04", borderRadius: 2, p: 0.5 }}>
              <Email sx={{ color: "#FFCE04", ml: 1 }} />
              <TextField
                placeholder="coloque seu e-mail"
                variant="standard"
                sx={{ ml: 1, flex: 1, "& .MuiInput-underline:before": { borderBottom: "none" } }}
              />
              <Button
                sx={{
                  backgroundColor: "#FFCE04",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  "&:hover": { backgroundColor: "#E5B900" },
                }}
              >
                inscreva-se
              </Button>
            </Box>

            {/* Ícones de Redes Sociais */}
            <Box mt={2} display="flex" gap={1.5}>
              {[Twitter, LinkedIn, YouTube, Instagram, RssFeed].map((Icon, index) => (
                <IconButton key={index} sx={{ backgroundColor: "#333", color: "#fff", "&:hover": { backgroundColor: "#555" } }}>
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
            
            <Box mt={2} display="flex" justifyContent="center" gap={2}>
              <Typography variant="body2" sx={{ fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}>
                Política de privacidade
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}>
                Termos de uso
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
