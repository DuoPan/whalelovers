<?php
	$tags = array('</p>','</strong>','<br>');
	$dataFro = $_POST['hiddeninput']; 
	$dataFro =  str_replace($tags,"dock",$dataFro);
	$dataFro = strip_tags($dataFro);
	$dataFro = explode("dock",$dataFro);
	require("./pdfFile/fpdf.php");
	class PDF extends FPDF{
		function Header(){
			 // Logo
			$this->Image('../assets/images/logo_title.png',50,6,30,'C');
			// Arial bold 15
			$this->SetFont('Arial','B',25);
			// Move to the right
			$this->Cell(20);
			// Title
			$this->Cell(0,30,'WHALE LOVERS',0,1,'C');
			// Line break
			$this->Ln(15);
		}
		
		function Footer(){
			// Position at 1.5 cm from bottom
			$this->SetY(-15);
			// Arial italic 8
			$this->SetFont('Arial','I',8);
			// Page number
			$this->Cell(0,10,'2018 - Asiadock',0,0,'C');
		}
	}
	
	$pdf = new PDF();
	
	$pdf->AliasNbPages();
	$pdf->AddPage();
	$pdf->Cell(0,0,"",1,1);
	$pdf->SetFont('Arial','I',20);
	$pdf->setTextColor(	0, 149, 255);
	$pdf->Cell(0,20,"TRIP ADVISORY",0,1);
	$pdf->SetFont('Arial','',15);
	$pdf->setTextColor(	0, 0, 0);
	
	$pdf->Cell(31,10,'Whale Type: ',0,0);
	$pdf->Cell(10,10,"{$dataFro[0]}",0,1);
	$pdf->Cell(35,10,"{$dataFro[1]}",0,1);
	$pdf->Cell(35,10,"{$dataFro[2]}",0,1);
	$pdf->output('D','whalelover.pdf');
?>